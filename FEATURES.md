# Pine Script Extension Features

## Complete Feature List

### 1. Syntax Highlighting

- **Full Pine Script v5 syntax support**
- Color-coded elements:
  - Keywords (if, else, for, while, function, var, etc.)
  - Built-in functions (ta.sma, math.abs, str.tostring, etc.)
  - Built-in variables (open, high, low, close, volume, etc.)
  - Types (int, float, bool, color, string, array, etc.)
  - Constants (extend.none, location.belowbar, etc.)
  - Comments (single-line and multi-line)
  - Strings and numbers
  - Operators

### 2. Language Server Features

#### Code Completion

- **Namespace-aware completion**: Type `ta.` to see all technical analysis functions
- **Context-aware suggestions**: Based on current typing context
- **Built-in function completion**: All Pine Script v5 functions included
- **Variable completion**: Built-in variables (open, high, low, close, etc.)
- **Type completion**: All Pine Script types
- **Keyword completion**: Language keywords

#### Hover Documentation

- **Function documentation**: Detailed info for all built-in functions
- **Parameter information**: Shows function signatures
- **Return type information**: Displays return types
- **Usage examples**: Contextual help

#### Diagnostics

- **Version directive validation**: Checks for `//@version=5`
- **Syntax error detection**: Identifies syntax issues
- **Parentheses matching**: Validates bracket pairs
- **Type checking**: Warns about type mismatches
- **Missing colon detection**: Checks control statements

#### Document Symbols

- **Function detection**: Finds all user-defined functions
- **Variable detection**: Identifies var/varip declarations
- **Indicator/Strategy detection**: Locates main declarations
- **Symbol navigation**: Jump to definition support

### 3. Code Snippets

#### Templates

- `indicator` - Complete indicator template
- `strategy` - Complete strategy template
- `function` - Function declaration template

#### Input Functions

- `input.bool` - Boolean input
- `input.float` - Float input with validation
- `input.int` - Integer input with validation
- `input.string` - String input
- `input.color` - Color input

#### Technical Analysis

- `ta.sma` - Simple Moving Average
- `ta.ema` - Exponential Moving Average
- `ta.rsi` - Relative Strength Index
- `ta.macd` - MACD indicator
- `ta.pivothigh` - Pivot high detection
- `ta.pivotlow` - Pivot low detection
- `ta.cross` - Cross detection
- `ta.crossover` - Crossover detection
- `ta.crossunder` - Crossunder detection

#### Plotting Functions

- `plot` - Plot series
- `plotshape` - Plot shapes
- `label.new` - Create label
- `line.new` - Create line
- `box.new` - Create box

#### Strategy Functions

- `strategy.entry` - Entry order
- `strategy.exit` - Exit order
- `strategy.close` - Close position

#### Array Operations

- `array.new` - Create array
- `array.push` - Push to array
- `array.get` - Get from array

#### Math Functions

- `math.abs` - Absolute value
- `math.max` - Maximum
- `math.min` - Minimum
- `math.round` - Round
- `math.floor` - Floor
- `math.ceil` - Ceiling
- `math.sqrt` - Square root
- `math.pow` - Power

#### String Functions

- `str.tostring` - Convert to string
- `str.tonumber` - Convert to number
- `str.format` - Format string

#### Control Flow

- `if` - If statement
- `ifelse` - If-else statement
- `for` - For loop
- `while` - While loop

#### Utilities

- `var` - Variable declaration
- `varip` - Repainting variable declaration
- `not na` - Check for NA
- `nz` - Replace NA value
- `color.new` - Create color
- `alert` - Create alert
- `alertcondition` - Alert condition

### 4. Language Configuration

#### Auto-closing Pairs

- Parentheses `()`
- Brackets `[]`
- Braces `{}`
- Quotes `""` and `''`

#### Bracket Matching

- Visual matching of opening/closing brackets
- Highlight matching pairs

#### Code Folding

- Fold regions marked with `//#region` and `//#endregion`
- Fold functions and control structures

#### Smart Indentation

- Automatic indentation for:
  - Functions
  - Control statements (if, for, while)
  - Blocks

#### Word Patterns

- Recognizes Pine Script identifiers
- Supports numbers and decimal values

### 5. Configuration Options

All features can be toggled via VS Code/Cursor settings:

```json
{
  "pinescript.enableDiagnostics": true, // Enable/disable diagnostics
  "pinescript.enableCompletion": true, // Enable/disable autocomplete
  "pinescript.enableHover": true // Enable/disable hover docs
}
```

## Supported Pine Script v5 Features

### Built-in Functions (50+)

- Technical Analysis: 30+ functions
- Math: 15+ functions
- String: 10+ functions
- Array: 10+ functions
- Input: 5 functions
- Strategy: 5+ functions
- Plotting: 10+ functions

### Built-in Variables (15+)

- Price data: open, high, low, close, volume
- Time data: time, timenow, bar_index
- Symbol info: syminfo.\* (10+ properties)

### Types (12+)

- Primitives: int, float, bool, color, string
- Collections: array, matrix, map
- Objects: line, label, box, table

## Performance

- **Fast activation**: Extension activates only for `.pine` files
- **Efficient parsing**: Lightweight syntax analysis
- **Minimal memory**: Optimized language server
- **Responsive completion**: Quick autocomplete suggestions

## Compatibility

- **VS Code**: 1.74.0+
- **Cursor**: All versions
- **Pine Script**: v5 (primary support)
- **Node.js**: 16+ (for building)

## Future Enhancements

Potential features for future versions:

- Format on save
- Code formatting
- Refactoring support
- Go to definition for user functions
- Find all references
- Rename symbol
- Error squiggles with fixes
- Integration with TradingView API
