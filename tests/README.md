# Pine Script Extension Test Suite

This directory contains test files and instructions for testing the Pine Script Language Support extension.

## Test Files

### Version Directive Tests

- `test-v5.pine` - PineScript v5 indicator
- `test-v6.pine` - PineScript v6 indicator
- `test-no-version.pine` - Missing version directive (should show warning)
- `test-invalid-version.pine` - Invalid version number (should show error)

### Syntax Highlighting Tests

- `test-syntax-basic.pine` - Basic syntax elements
- `test-syntax-advanced.pine` - Advanced syntax features
- `test-syntax-functions.pine` - Function declarations and calls

### Code Completion Tests

- `test-completion-ta.pine` - Technical analysis namespace completion
- `test-completion-math.pine` - Math namespace completion
- `test-completion-str.pine` - String namespace completion
- `test-completion-array.pine` - Array namespace completion

### Diagnostics Tests

- `test-diagnostics-errors.pine` - Contains intentional errors
- `test-diagnostics-warnings.pine` - Contains warnings

### Feature Tests

- `test-indicator.pine` - Complete indicator example
- `test-strategy.pine` - Complete strategy example
- `test-library.pine` - Library example (v6 feature)

## Testing Instructions

### Prerequisites

1. Install the extension:

   ```bash
   code --install-extension pinescript-1.0.0.vsix
   ```

   Or use the Extension Development Host (F5) for testing during development.

2. Reload VS Code/Cursor window after installation.

### Test Checklist

#### 1. Version Directive Validation

- [ ] Open `test-v5.pine` - Should recognize v5, no warnings
- [ ] Open `test-v6.pine` - Should recognize v6, no warnings
- [ ] Open `test-no-version.pine` - Should show warning about missing version directive
- [ ] Open `test-invalid-version.pine` - Should show error about unsupported version

**Expected Behavior:**

- v5 and v6 files: No version-related diagnostics
- Missing version: Warning message suggesting `//@version=6` or `//@version=5`
- Invalid version: Error message indicating version not supported

#### 2. Syntax Highlighting

- [ ] Open `test-syntax-basic.pine`
- [ ] Open `test-syntax-advanced.pine`
- [ ] Open `test-syntax-functions.pine`

**Expected Behavior:**

- Keywords (if, else, for, while, var, function) are highlighted
- Built-in functions (ta.sma, math.abs, str.tostring) are highlighted
- Types (int, float, bool, color, string) are highlighted
- Strings and numbers are color-coded
- Comments are properly styled

#### 3. Code Completion

- [ ] Open `test-completion-ta.pine`
  - Type `ta.` and press Ctrl+Space (Cmd+Space on Mac)
  - Should see list of technical analysis functions
- [ ] Open `test-completion-math.pine`
  - Type `math.` and press Ctrl+Space
  - Should see list of math functions
- [ ] Open `test-completion-str.pine`
  - Type `str.` and press Ctrl+Space
  - Should see list of string functions
- [ ] Open `test-completion-array.pine`
  - Type `array.` and press Ctrl+Space
  - Should see list of array functions

**Expected Behavior:**

- Namespace-aware completion appears automatically
- Function signatures shown in detail
- Documentation appears on hover
- Insert text includes proper parameter placeholders

#### 4. Hover Documentation

- [ ] Hover over `ta.sma` - Should show function documentation
- [ ] Hover over `math.abs` - Should show function documentation
- [ ] Hover over `open` - Should show variable documentation
- [ ] Hover over `syminfo.ticker` - Should show variable documentation

**Expected Behavior:**

- Detailed documentation appears in hover tooltip
- Function signatures displayed
- Parameter information shown
- Return types indicated

#### 5. Diagnostics

- [ ] Open `test-diagnostics-errors.pine`
  - Should show syntax errors
  - Should show type errors
- [ ] Open `test-diagnostics-warnings.pine`
  - Should show warnings for potential issues

**Expected Behavior:**

- Errors shown with red squiggles
- Warnings shown with yellow squiggles
- Error messages are descriptive
- Line numbers are accurate

#### 6. Snippets

- [ ] Create new `.pine` file
- [ ] Type `indicator` and press Tab
  - Should expand to indicator template with `//@version=6`
- [ ] Type `strategy` and press Tab
  - Should expand to strategy template with `//@version=6`
- [ ] Type `ta.sma` and press Tab
  - Should expand to SMA function template
- [ ] Type `input.bool` and press Tab
  - Should expand to boolean input template

**Expected Behavior:**

- Snippets expand correctly
- Version directive defaults to v6
- Placeholders are properly positioned
- Tab navigation works between placeholders

#### 7. Feature Tests

- [ ] Open `test-indicator.pine`
  - Verify all features work together
  - Check syntax highlighting
  - Test code completion
  - Verify hover documentation
- [ ] Open `test-strategy.pine`
  - Verify strategy-specific features
  - Check strategy function completion
- [ ] Open `test-library.pine` (v6 feature)
  - Verify library syntax is recognized
  - Check v6-specific features

**Expected Behavior:**

- All features work together seamlessly
- No false positives in diagnostics
- Code completion suggests relevant items
- Syntax highlighting is accurate

### Manual Testing Steps

1. **Open Test File:**

   ```bash
   code tests/test-v6.pine
   ```

2. **Verify Language Detection:**

   - Check bottom-right corner shows "Pine Script"
   - File icon should indicate Pine Script file

3. **Test Autocomplete:**

   - Place cursor after `ta.`
   - Press Ctrl+Space (Cmd+Space on Mac)
   - Verify suggestions appear

4. **Test Hover:**

   - Hover over any built-in function
   - Verify documentation appears

5. **Test Diagnostics:**

   - Open Problems panel (Ctrl+Shift+M / Cmd+Shift+M)
   - Verify diagnostics appear correctly

6. **Test Snippets:**
   - Type snippet prefix
   - Press Tab
   - Verify expansion

### Automated Testing (Future)

For automated testing, consider:

- Language Server Protocol test framework
- Unit tests for completion data
- Integration tests for diagnostics

## Reporting Issues

If you find issues during testing:

1. Note the test file name
2. Describe expected vs actual behavior
3. Include VS Code/Cursor version
4. Include extension version
5. Include relevant code snippets

## Test Coverage

- Version directive validation (v5 and v6)
- Syntax highlighting
- Code completion (namespaces)
- Hover documentation
- Diagnostics (errors and warnings)
- Snippets
- Indicator templates
- Strategy templates
- Library support (v6)
