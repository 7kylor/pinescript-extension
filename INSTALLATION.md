# Installation Guide

## Quick Start

### Option 1: Install from VSIX (Recommended)

1. Build the extension:

   ```bash
   cd pinescript-extension
   npm install
   npm run compile
   ```

2. Package the extension:

   ```bash
   npm install -g vsce
   vsce package
   ```

   This creates a `.vsix` file.

3. Install in VS Code/Cursor:
   - Open VS Code/Cursor
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
   - Type "Install from VSIX"
   - Select the generated `.vsix` file

### Option 2: Development Mode

1. Clone or navigate to the extension directory:

   ```bash
   cd pinescript-extension
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Compile the extension:

   ```bash
   npm run compile
   ```

4. Open the extension folder in VS Code/Cursor:

   ```bash
   code .
   ```

5. Press `F5` to launch a new Extension Development Host window

6. In the new window, open a `.pine` file to test the extension

## Building

### Compile TypeScript

```bash
npm run compile
```

### Watch Mode (for development)

```bash
npm run watch
```

In a separate terminal:

```bash
npm run watch:server
```

## Testing

1. Open a `.pine` file in VS Code/Cursor
2. Verify syntax highlighting works
3. Type `ta.` and verify autocomplete appears
4. Hover over a function name to see documentation
5. Try snippets by typing `indicator` and pressing Tab

## Install

```bash
code --install-extension pinescript-1.0.0.vsix
```

or

```bash
code --install-extension pinescript-1.0.0.vsix --force
```

## Troubleshooting

### Extension not activating

- Ensure you have a `.pine` file open
- Check the Output panel for "Pine Script Language Server" errors
- Verify the extension compiled successfully (`out/` folder exists)

### No autocomplete

- Check settings: `pinescript.enableCompletion` should be `true`
- Reload the window: `Cmd+R` (Mac) or `Ctrl+R` (Windows/Linux)

### Language server not starting

- Check that `out/server/server.js` exists
- Verify Node.js is installed: `node --version`
- Check the Developer Console for errors

## Requirements

- Node.js 16+
- VS Code/Cursor 1.74.0+
- npm or yarn

```

```
