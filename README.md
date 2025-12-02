# Pine Script Language Support for VS Code and Cursor

A comprehensive language support extension for Pine Script v5 and v6, providing syntax highlighting, IntelliSense, code completion, hover documentation, diagnostics, and snippets.

## Features

### Syntax Highlighting

- Full Pine Script v5 and v6 syntax support
- Color-coded keywords, functions, types, and operators
- Support for comments, strings, and numbers

### IntelliSense & Code Completion

- Auto-completion for all built-in Pine Script functions
- Namespace-aware completion (ta., math., str., array., etc.)
- Completion for built-in variables (open, high, low, close, volume, etc.)
- Type-aware suggestions

### Hover Documentation

- Detailed documentation for all built-in functions
- Parameter information and return types
- Usage examples

### Diagnostics

- Version directive validation
- Syntax error detection
- Parentheses matching
- Type checking warnings

### Snippets

- Indicator template
- Strategy template
- Function templates
- Input declarations (bool, float, int, string, color)
- Technical analysis functions (SMA, EMA, RSI, MACD, etc.)
- Plotting functions (plot, plotshape, label, line, box)
- Strategy functions (entry, exit, close)
- Array operations
- Math functions
- String functions

### Language Features

- Bracket matching and auto-closing
- Code folding
- Smart indentation
- Word pattern recognition

## Installation

See [INSTALLATION.md](./INSTALLATION.md) for detailed installation instructions.

### Quick Install

1. Install dependencies:

   ```bash
   npm install
   ```

2. Compile the extension:

   ```bash
   npm run compile
   ```

3. Package and install:

   ```bash
   npm install -g vsce
   vsce package
   ```

   Then install the generated `.vsix` file in VS Code/Cursor.

## Usage

### Opening Pine Script Files

The extension automatically activates when you open a `.pine` file.

### Code Completion

Start typing and press `Ctrl+Space` (or `Cmd+Space` on Mac) to trigger code completion. The extension provides context-aware suggestions based on:

- Current namespace (ta., math., str., etc.)
- Built-in functions and variables
- Keywords and types

### Hover Documentation

Hover over any built-in function or variable to see detailed documentation.

### Snippets

Type snippet prefixes and press `Tab` to expand:

- `indicator` - Create indicator template
- `strategy` - Create strategy template
- `ta.sma` - Simple Moving Average
- `ta.ema` - Exponential Moving Average
- `ta.rsi` - Relative Strength Index
- `input.bool` - Boolean input
- `input.float` - Float input
- And many more...

### Diagnostics

The extension automatically validates your Pine Script code and shows:

- Missing version directive warnings (supports v5 and v6)
- Syntax errors
- Type mismatches
- Parentheses mismatches

## Configuration

You can configure the extension in VS Code/Cursor settings:

```json
{
  "pinescript.enableDiagnostics": true,
  "pinescript.enableCompletion": true,
  "pinescript.enableHover": true
}
```

## Supported Pine Script Features

### Built-in Functions

- Technical Analysis: `ta.sma`, `ta.ema`, `ta.rsi`, `ta.macd`, `ta.bb`, `ta.atr`, `ta.stoch`, `ta.adx`, `ta.pivothigh`, `ta.pivotlow`, and more
- Math Functions: `math.abs`, `math.max`, `math.min`, `math.round`, `math.floor`, `math.ceil`, `math.sqrt`, `math.pow`, and more
- String Functions: `str.tostring`, `str.tonumber`, `str.format`, `str.contains`, `str.replace`, and more
- Array Functions: `array.new`, `array.push`, `array.get`, `array.size`, and more
- Input Functions: `input.bool`, `input.float`, `input.int`, `input.string`, `input.color`
- Strategy Functions: `strategy.entry`, `strategy.exit`, `strategy.close`
- Plotting Functions: `plot`, `plotshape`, `label.new`, `line.new`, `box.new`
- Request Functions: `request.security`

### Built-in Variables

- Price data: `open`, `high`, `low`, `close`, `volume`
- Time data: `time`, `timenow`, `bar_index`
- Symbol info: `syminfo.ticker`, `syminfo.tickerid`, `syminfo.prefix`, `syminfo.root`, `syminfo.basecurrency`, `syminfo.currency`

### Types

- Primitive: `int`, `float`, `bool`, `color`, `string`
- Collections: `array`, `matrix`, `map`
- Objects: `line`, `label`, `box`, `table`

## Requirements

- VS Code or Cursor version 1.74.0 or higher
- Node.js (for building from source)

## Development

### Project Structure

```
pinescript-extension/
├── src/
│   ├── extension.ts          # Extension entry point
│   └── server/
│       ├── server.ts         # Language server
│       └── pinescriptData.ts # Completion data
├── syntaxes/
│   └── pinescript.tmLanguage.json  # TextMate grammar
├── snippets/
│   └── pinescript.json       # Code snippets
├── language-configuration.json
├── package.json
└── tsconfig.json
```

### Building

```bash
npm install
npm run compile
```

### Watching for Changes

```bash
npm run watch
```

### Packaging

```bash
npm install -g vsce
vsce package
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License

## Acknowledgments

- Pine Script documentation by TradingView
- VS Code Language Server Protocol

## Support

For issues, feature requests, or questions, please open an issue on the repository.
