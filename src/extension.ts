import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext): void {
  const serverModule = context.asAbsolutePath("out/server/server.js");

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: { execArgv: ["--nolazy", "--inspect=6009"] },
    },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "pinescript" }],
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher("**/.pine"),
    },
  };

  client = new LanguageClient(
    "pinescriptLanguageServer",
    "Pine Script Language Server",
    serverOptions,
    clientOptions
  );

  client.start();

  const formatCommand = vscode.commands.registerCommand(
    "pinescript.format",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.document.languageId === "pinescript") {
        vscode.commands.executeCommand("editor.action.formatDocument");
      }
    }
  );

  context.subscriptions.push(formatCommand);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
