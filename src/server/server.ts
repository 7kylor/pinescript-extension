import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  DidChangeConfigurationNotification,
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  TextDocumentSyncKind,
  InitializeResult,
  Hover,
  MarkupKind,
  DocumentSymbolParams,
  SymbolInformation,
  SymbolKind,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import {
  builtinFunctions,
  builtinVariables,
  keywords,
  types,
} from "./pinescriptData";

const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;

connection.onInitialize((params: InitializeParams) => {
  const capabilities = params.capabilities;

  hasConfigurationCapability = !!(
    capabilities.workspace && !!capabilities.workspace.configuration
  );
  hasWorkspaceFolderCapability = !!(
    capabilities.workspace && !!capabilities.workspace.workspaceFolders
  );
  hasDiagnosticRelatedInformationCapability = !!(
    capabilities.textDocument &&
    capabilities.textDocument.publishDiagnostics &&
    capabilities.textDocument.publishDiagnostics.relatedInformation
  );

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: true,
        triggerCharacters: [".", "(", "["],
      },
      hoverProvider: true,
      documentSymbolProvider: true,
    },
  };

  if (hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true,
      },
    };
  }

  return result;
});

connection.onInitialized(() => {
  if (hasConfigurationCapability) {
    connection.client.register(
      DidChangeConfigurationNotification.type,
      undefined
    );
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders((_event: unknown) => {
      connection.console.log("Workspace folder change event received.");
    });
  }
});

const defaultSettings: {
  pinescript: {
    enableDiagnostics: boolean;
    enableCompletion: boolean;
    enableHover: boolean;
  };
} = {
  pinescript: {
    enableDiagnostics: true,
    enableCompletion: true,
    enableHover: true,
  },
};
let globalSettings: typeof defaultSettings = defaultSettings;

const documentSettings: Map<
  string,
  Thenable<typeof defaultSettings>
> = new Map();

connection.onDidChangeConfiguration(
  (change: {
    settings: { pinescript?: typeof defaultSettings.pinescript };
  }) => {
    if (hasConfigurationCapability) {
      documentSettings.clear();
    } else {
      globalSettings = <typeof defaultSettings>(
        (change.settings.pinescript || defaultSettings)
      );
    }
    documents.all().forEach(validateTextDocument);
  }
);

function getDocumentSettings(
  resource: string
): Thenable<typeof defaultSettings> {
  if (!hasConfigurationCapability) {
    return Promise.resolve(globalSettings);
  }
  let result = documentSettings.get(resource);
  if (!result) {
    const config = connection.workspace.getConfiguration({
      scopeUri: resource,
      section: "pinescript",
    });
    result = config.then((value) => {
      return {
        pinescript: {
          enableDiagnostics:
            value?.enableDiagnostics ??
            defaultSettings.pinescript.enableDiagnostics,
          enableCompletion:
            value?.enableCompletion ??
            defaultSettings.pinescript.enableCompletion,
          enableHover:
            value?.enableHover ?? defaultSettings.pinescript.enableHover,
        },
      } as typeof defaultSettings;
    }) as Thenable<typeof defaultSettings>;
    documentSettings.set(resource, result);
  }
  return result;
}

documents.onDidClose((e: { document: TextDocument }) => {
  documentSettings.delete(e.document.uri);
});

function validateTextDocument(textDocument: TextDocument): void {
  getDocumentSettings(textDocument.uri).then((settings) => {
    const diagnostics: Diagnostic[] = [];
    const text = textDocument.getText();
    const lines = text.split("\n");

    const pinescriptSettings =
      settings?.pinescript || defaultSettings.pinescript;
    if (!pinescriptSettings.enableDiagnostics) {
      connection.sendDiagnostics({ uri: textDocument.uri, diagnostics: [] });
      return;
    }

    let hasVersionDirective = false;
    let versionLine = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i;

      if (i === 0 && line.match(/^\/\/@version=\d+/)) {
        hasVersionDirective = true;
        versionLine = i;
        const versionMatch = line.match(/^\/\/@version=(\d+)/);
        if (versionMatch) {
          const version = parseInt(versionMatch[1]);
          if (version < 1 || version > 5) {
            diagnostics.push({
              severity: DiagnosticSeverity.Warning,
              range: {
                start: { line: lineNumber, character: 0 },
                end: { line: lineNumber, character: line.length },
              },
              message: `Pine Script version ${version} is not supported. Use version 5.`,
              source: "pinescript",
            });
          }
        }
      }

      if (i === 0 && !hasVersionDirective && line.trim() !== "") {
        diagnostics.push({
          severity: DiagnosticSeverity.Warning,
          range: {
            start: { line: 0, character: 0 },
            end: { line: 0, character: line.length },
          },
          message:
            "Missing version directive. Add //@version=5 at the top of the file.",
          source: "pinescript",
        });
      }

      const openParens = (line.match(/\(/g) || []).length;
      const closeParens = (line.match(/\)/g) || []).length;
      if (openParens !== closeParens && i < lines.length - 1) {
        const nextLine = lines[i + 1];
        const nextOpenParens = (nextLine.match(/\(/g) || []).length;
        const nextCloseParens = (nextLine.match(/\)/g) || []).length;
        if (openParens - closeParens !== nextCloseParens - nextOpenParens) {
          diagnostics.push({
            severity: DiagnosticSeverity.Error,
            range: {
              start: { line: lineNumber, character: line.length - 1 },
              end: { line: lineNumber, character: line.length },
            },
            message: "Mismatched parentheses.",
            source: "pinescript",
          });
        }
      }

      if (
        line.includes("var ") &&
        line.includes("=") &&
        !line.includes("var ")
      ) {
        const varMatch = line.match(/var\s+(\w+)/);
        if (
          varMatch &&
          ![
            "int",
            "float",
            "bool",
            "color",
            "string",
            "array",
            "matrix",
            "map",
            "line",
            "label",
            "box",
            "table",
          ].includes(varMatch[1])
        ) {
          diagnostics.push({
            severity: DiagnosticSeverity.Warning,
            range: {
              start: { line: lineNumber, character: line.indexOf("var") },
              end: {
                line: lineNumber,
                character: line.indexOf("var") + varMatch[0].length,
              },
            },
            message: `Unknown type: ${varMatch[1]}`,
            source: "pinescript",
          });
        }
      }

      if (
        line.match(/\b(if|for|while|function)\s+[^:]+$/) &&
        !line.includes("=>") &&
        !line.includes(":")
      ) {
        diagnostics.push({
          severity: DiagnosticSeverity.Error,
          range: {
            start: { line: lineNumber, character: 0 },
            end: { line: lineNumber, character: line.length },
          },
          message: "Missing colon (:) after control statement.",
          source: "pinescript",
        });
      }
    }

    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
  });
}

documents.onDidChangeContent((change: { document: TextDocument }) => {
  validateTextDocument(change.document);
});

connection.onDidChangeWatchedFiles((_change: unknown) => {
  connection.console.log("We received a file change event");
});

connection.onCompletion(
  async (
    textDocumentPosition: TextDocumentPositionParams
  ): Promise<CompletionItem[]> => {
    const document = documents.get(textDocumentPosition.textDocument.uri);
    if (!document) {
      return [];
    }

    const settings = await getDocumentSettings(
      textDocumentPosition.textDocument.uri
    );
    const pinescriptSettings =
      settings?.pinescript || defaultSettings.pinescript;
    if (!pinescriptSettings.enableCompletion) {
      return [];
    }

    const position = textDocumentPosition.position;
    const text = document.getText();
    const lines = text.split("\n");
    const line = lines[position.line];
    const textUntilPosition = line.substring(0, position.character);

    const completions: CompletionItem[] = [];

    const allCompletions = [
      ...builtinFunctions.map((f) => ({
        ...f,
        kind: CompletionItemKind.Function,
      })),
      ...builtinVariables.map((v) => ({
        ...v,
        kind: CompletionItemKind.Variable,
      })),
      ...keywords.map((k) => ({
        ...k,
        kind: CompletionItemKind.Keyword,
      })),
      ...types.map((t) => ({
        ...t,
        kind: CompletionItemKind.TypeParameter,
      })),
    ];

    if (textUntilPosition.endsWith("ta.")) {
      const taFunctions = builtinFunctions.filter((f) =>
        f.label.startsWith("ta.")
      );
      return taFunctions.map((f) => ({
        label: f.label,
        kind: CompletionItemKind.Function,
        detail: f.detail,
        documentation: f.documentation,
        insertText: f.insertText || f.label,
      }));
    }

    if (textUntilPosition.endsWith("math.")) {
      const mathFunctions = builtinFunctions.filter((f) =>
        f.label.startsWith("math.")
      );
      return mathFunctions.map((f) => ({
        label: f.label,
        kind: CompletionItemKind.Function,
        detail: f.detail,
        documentation: f.documentation,
        insertText: f.insertText || f.label,
      }));
    }

    if (textUntilPosition.endsWith("str.")) {
      const strFunctions = builtinFunctions.filter((f) =>
        f.label.startsWith("str.")
      );
      return strFunctions.map((f) => ({
        label: f.label,
        kind: CompletionItemKind.Function,
        detail: f.detail,
        documentation: f.documentation,
        insertText: f.insertText || f.label,
      }));
    }

    if (textUntilPosition.endsWith("array.")) {
      const arrayFunctions = builtinFunctions.filter((f) =>
        f.label.startsWith("array.")
      );
      return arrayFunctions.map((f) => ({
        label: f.label,
        kind: CompletionItemKind.Function,
        detail: f.detail,
        documentation: f.documentation,
        insertText: f.insertText || f.label,
      }));
    }

    if (textUntilPosition.endsWith("input.")) {
      const inputFunctions = builtinFunctions.filter((f) =>
        f.label.startsWith("input.")
      );
      return inputFunctions.map((f) => ({
        label: f.label,
        kind: CompletionItemKind.Function,
        detail: f.detail,
        documentation: f.documentation,
        insertText: f.insertText || f.label,
      }));
    }

    if (textUntilPosition.endsWith("strategy.")) {
      const strategyFunctions = builtinFunctions.filter((f) =>
        f.label.startsWith("strategy.")
      );
      return strategyFunctions.map((f) => ({
        label: f.label,
        kind: CompletionItemKind.Function,
        detail: f.detail,
        documentation: f.documentation,
        insertText: f.insertText || f.label,
      }));
    }

    if (textUntilPosition.endsWith("syminfo.")) {
      const syminfoVars = builtinVariables.filter((v) =>
        v.label.startsWith("syminfo.")
      );
      return syminfoVars.map((v) => ({
        label: v.label,
        kind: CompletionItemKind.Variable,
        detail: v.detail,
        documentation: v.documentation,
      }));
    }

    if (textUntilPosition.endsWith("color.")) {
      return [
        {
          label: "color.new",
          kind: CompletionItemKind.Function,
          detail: "color.new(color, transparency) -> color",
          documentation: "Create a new color with transparency.",
          insertText: "color.new(${1:color.blue}, ${2:0})",
        },
        {
          label: "color.rgb",
          kind: CompletionItemKind.Function,
          detail: "color.rgb(red, green, blue, transparency) -> color",
          documentation: "Create color from RGB values.",
          insertText: "color.rgb(${1:255}, ${2:255}, ${3:255}, ${4:0})",
        },
      ];
    }

    const wordMatch = textUntilPosition.match(/(\w+)$/);
    if (wordMatch) {
      const word = wordMatch[1].toLowerCase();
      return allCompletions
        .filter((c) => c.label.toLowerCase().startsWith(word))
        .map((c) => ({
          label: c.label,
          kind: c.kind,
          detail: c.detail,
          documentation: c.documentation,
          insertText: c.insertText || c.label,
        }));
    }

    return allCompletions.map((c) => ({
      label: c.label,
      kind: c.kind,
      detail: c.detail,
      documentation: c.documentation,
      insertText: c.insertText || c.label,
    }));
  }
);

connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
  return item;
});

connection.onHover(
  async (params: TextDocumentPositionParams): Promise<Hover | null> => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
      return null;
    }

    const settings = await getDocumentSettings(params.textDocument.uri);
    const pinescriptSettings =
      settings?.pinescript || defaultSettings.pinescript;
    if (!pinescriptSettings.enableHover) {
      return null;
    }

    const position = params.position;
    const text = document.getText();
    const lines = text.split("\n");
    const line = lines[position.line];
    const textUntilPosition = line.substring(0, position.character);
    const textAfterPosition = line.substring(position.character);

    const wordMatch = textUntilPosition.match(/(\w+(?:\.\w+)*)$/);
    if (!wordMatch) {
      return null;
    }

    const word = wordMatch[1];
    const allItems = [
      ...builtinFunctions,
      ...builtinVariables,
      ...keywords,
      ...types,
    ];
    const item = allItems.find(
      (i) => i.label === word || i.label.endsWith("." + word.split(".").pop())
    );

    if (item && item.documentation) {
      return {
        contents: {
          kind: MarkupKind.Markdown,
          value: `**${item.label}**\n\n${item.detail || ""}\n\n${
            item.documentation
          }`,
        },
      };
    }

    return null;
  }
);

connection.onDocumentSymbol(
  (params: DocumentSymbolParams): SymbolInformation[] => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
      return [];
    }

    const text = document.getText();
    const lines = text.split("\n");
    const symbols: SymbolInformation[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      const indicatorMatch = line.match(/indicator\s*\(/);
      if (indicatorMatch) {
        symbols.push({
          name: "Indicator",
          kind: SymbolKind.Function,
          location: {
            uri: params.textDocument.uri,
            range: {
              start: { line: i, character: 0 },
              end: { line: i, character: line.length },
            },
          },
        });
      }

      const strategyMatch = line.match(/strategy\s*\(/);
      if (strategyMatch) {
        symbols.push({
          name: "Strategy",
          kind: SymbolKind.Function,
          location: {
            uri: params.textDocument.uri,
            range: {
              start: { line: i, character: 0 },
              end: { line: i, character: line.length },
            },
          },
        });
      }

      const functionMatch = line.match(/(\w+)\s*\([^)]*\)\s*=>/);
      if (functionMatch) {
        symbols.push({
          name: functionMatch[1],
          kind: SymbolKind.Function,
          location: {
            uri: params.textDocument.uri,
            range: {
              start: { line: i, character: 0 },
              end: { line: i, character: line.length },
            },
          },
        });
      }

      const varMatch = line.match(/(?:var|varip)\s+(\w+)\s*=/);
      if (varMatch) {
        symbols.push({
          name: varMatch[1],
          kind: SymbolKind.Variable,
          location: {
            uri: params.textDocument.uri,
            range: {
              start: { line: i, character: 0 },
              end: { line: i, character: line.length },
            },
          },
        });
      }
    }

    return symbols;
  }
);

documents.listen(connection);
connection.listen();
