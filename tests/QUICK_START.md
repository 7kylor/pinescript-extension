# Quick Start Testing Guide

## Quick Test (5 minutes)

1. **Install Extension:**

   ```bash
   code --install-extension pinescript-1.0.0.vsix
   ```

2. **Open Test File:**

   ```bash
   code tests/test-v6.pine
   ```

3. **Verify Basic Features:**
   - File shows "Pine Script" in bottom-right corner
   - Syntax highlighting works (keywords are colored)
   - Type `ta.` and press Ctrl+Space → See autocomplete
   - Hover over `ta.sma` → See documentation
   - No errors in Problems panel

## Essential Tests

### Test 1: Version Support

```bash
code tests/test-v6.pine
```

- Should show no version warnings
- File should be recognized as Pine Script

### Test 2: Autocomplete

```bash
code tests/test-completion-ta.pine
```

- Place cursor after `ta.`
- Press Ctrl+Space (Cmd+Space on Mac)
- Should see list of TA functions

### Test 3: Diagnostics

```bash
code tests/test-no-version.pine
```

- Should show warning about missing version directive
- Check Problems panel (Ctrl+Shift+M)

### Test 4: Snippets

- Create new `.pine` file
- Type `indicator` and press Tab
- Should expand to template with `//@version=6`

## Full Test Suite

See [README.md](./README.md) for complete testing instructions.

## Test Files Overview

| File                        | Purpose              | Expected Result       |
| --------------------------- | -------------------- | --------------------- |
| `test-v5.pine`              | V5 version directive | No warnings           |
| `test-v6.pine`              | V6 version directive | No warnings           |
| `test-no-version.pine`      | Missing version      | Warning shown         |
| `test-invalid-version.pine` | Invalid version      | Error shown           |
| `test-completion-*.pine`    | Code completion      | Autocomplete works    |
| `test-diagnostics-*.pine`   | Error detection      | Errors/warnings shown |
| `test-indicator.pine`       | Full indicator       | All features work     |
| `test-strategy.pine`        | Full strategy        | All features work     |
| `test-library.pine`         | Library syntax       | V6 features work      |

## Troubleshooting

**Extension not activating?**

- Ensure `.pine` file extension is used
- Reload VS Code/Cursor window
- Check Output panel for errors

**No autocomplete?**

- Check settings: `pinescript.enableCompletion` should be `true`
- Press Ctrl+Space manually to trigger
- Verify language shows as "Pine Script"

**No syntax highlighting?**

- Check file extension is `.pine`
- Verify language mode (bottom-right corner)
- Reload window if needed
