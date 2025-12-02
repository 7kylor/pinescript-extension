export interface PineScriptCompletion {
  label: string;
  kind: number;
  detail?: string;
  documentation?: string;
  insertText?: string;
}

export const builtinFunctions: PineScriptCompletion[] = [
  {
    label: "ta.sma",
    kind: 1,
    detail: "ta.sma(source, length) -> series float",
    documentation:
      "Simple Moving Average. Calculates the average of the last length values of source.",
    insertText: "ta.sma(${1:source}, ${2:length})",
  },
  {
    label: "ta.ema",
    kind: 1,
    detail: "ta.ema(source, length) -> series float",
    documentation:
      "Exponential Moving Average. Calculates the exponential moving average of source over length bars.",
    insertText: "ta.ema(${1:source}, ${2:length})",
  },
  {
    label: "ta.rsi",
    kind: 1,
    detail: "ta.rsi(source, length) -> series float",
    documentation:
      "Relative Strength Index. Returns the RSI value, a momentum oscillator that measures the speed and magnitude of price changes.",
    insertText: "ta.rsi(${1:source}, ${2:length})",
  },
  {
    label: "ta.macd",
    kind: 1,
    detail:
      "ta.macd(source, fastlen, slowlen, siglen) -> [macdLine, signalLine, histLine]",
    documentation:
      "MACD (Moving Average Convergence Divergence). Returns a tuple with MACD line, signal line, and histogram.",
    insertText:
      "[${1:macdLine}, ${2:signalLine}, ${3:histLine}] = ta.macd(${4:source}, ${5:12}, ${6:26}, ${7:9})",
  },
  {
    label: "ta.bb",
    kind: 1,
    detail: "ta.bb(source, length, mult) -> [upper, middle, lower]",
    documentation: "Bollinger Bands. Returns upper, middle, and lower bands.",
    insertText:
      "[${1:upper}, ${2:middle}, ${3:lower}] = ta.bb(${4:source}, ${5:length}, ${6:mult})",
  },
  {
    label: "ta.atr",
    kind: 1,
    detail: "ta.atr(length) -> series float",
    documentation: "Average True Range. Measures market volatility.",
    insertText: "ta.atr(${1:length})",
  },
  {
    label: "ta.stoch",
    kind: 1,
    detail: "ta.stoch(source, high, low, length) -> series float",
    documentation: "Stochastic Oscillator. Returns the stochastic value.",
    insertText: "ta.stoch(${1:source}, ${2:high}, ${3:low}, ${4:length})",
  },
  {
    label: "ta.adx",
    kind: 1,
    detail: "ta.adx(length) -> series float",
    documentation: "Average Directional Index. Measures trend strength.",
    insertText: "ta.atr(${1:length})",
  },
  {
    label: "ta.pivothigh",
    kind: 1,
    detail: "ta.pivothigh(high, leftBars, rightBars) -> series float",
    documentation:
      "Pivot High. Returns the value of the highest high over leftBars and rightBars bars.",
    insertText: "ta.pivothigh(${1:high}, ${2:leftBars}, ${3:rightBars})",
  },
  {
    label: "ta.pivotlow",
    kind: 1,
    detail: "ta.pivotlow(low, leftBars, rightBars) -> series float",
    documentation:
      "Pivot Low. Returns the value of the lowest low over leftBars and rightBars bars.",
    insertText: "ta.pivotlow(${1:low}, ${2:leftBars}, ${3:rightBars})",
  },
  {
    label: "ta.cross",
    kind: 1,
    detail: "ta.cross(series1, series2) -> series bool",
    documentation: "Cross. Returns true when series1 crosses series2.",
    insertText: "ta.cross(${1:series1}, ${2:series2})",
  },
  {
    label: "ta.crossover",
    kind: 1,
    detail: "ta.crossover(series1, series2) -> series bool",
    documentation:
      "Crossover. Returns true when series1 crosses above series2.",
    insertText: "ta.crossover(${1:series1}, ${2:series2})",
  },
  {
    label: "ta.crossunder",
    kind: 1,
    detail: "ta.crossunder(series1, series2) -> series bool",
    documentation:
      "Crossunder. Returns true when series1 crosses below series2.",
    insertText: "ta.crossunder(${1:series1}, ${2:series2})",
  },
  {
    label: "math.abs",
    kind: 1,
    detail: "math.abs(value) -> series float",
    documentation: "Absolute value.",
    insertText: "math.abs(${1:value})",
  },
  {
    label: "math.max",
    kind: 1,
    detail: "math.max(value1, value2) -> series float",
    documentation: "Maximum of two values.",
    insertText: "math.max(${1:value1}, ${2:value2})",
  },
  {
    label: "math.min",
    kind: 1,
    detail: "math.min(value1, value2) -> series float",
    documentation: "Minimum of two values.",
    insertText: "math.min(${1:value1}, ${2:value2})",
  },
  {
    label: "math.round",
    kind: 1,
    detail: "math.round(value) -> series float",
    documentation: "Round to nearest integer.",
    insertText: "math.round(${1:value})",
  },
  {
    label: "math.floor",
    kind: 1,
    detail: "math.floor(value) -> series float",
    documentation: "Round down to nearest integer.",
    insertText: "math.floor(${1:value})",
  },
  {
    label: "math.ceil",
    kind: 1,
    detail: "math.ceil(value) -> series float",
    documentation: "Round up to nearest integer.",
    insertText: "math.ceil(${1:value})",
  },
  {
    label: "math.sqrt",
    kind: 1,
    detail: "math.sqrt(value) -> series float",
    documentation: "Square root.",
    insertText: "math.sqrt(${1:value})",
  },
  {
    label: "math.pow",
    kind: 1,
    detail: "math.pow(base, exponent) -> series float",
    documentation: "Power function.",
    insertText: "math.pow(${1:base}, ${2:exponent})",
  },
  {
    label: "str.tostring",
    kind: 1,
    detail: "str.tostring(value, format) -> series string",
    documentation: "Convert value to string with optional format.",
    insertText: 'str.tostring(${1:value}, "${2:#.##}")',
  },
  {
    label: "str.tonumber",
    kind: 1,
    detail: "str.tonumber(string) -> series float",
    documentation: "Convert string to number.",
    insertText: "str.tonumber(${1:string})",
  },
  {
    label: "str.format",
    kind: 1,
    detail: "str.format(format, ...args) -> series string",
    documentation: "Format string with arguments.",
    insertText: 'str.format("${1:format}", ${2:arg1}, ${3:arg2})',
  },
  {
    label: "array.new",
    kind: 1,
    detail: "array.new<type>(size) -> array",
    documentation: "Create a new array.",
    insertText: "array.new<${1:type}>(${2:})",
  },
  {
    label: "array.push",
    kind: 1,
    detail: "array.push(array, value) -> void",
    documentation: "Push value to array.",
    insertText: "array.push(${1:array}, ${2:value})",
  },
  {
    label: "array.get",
    kind: 1,
    detail: "array.get(array, index) -> type",
    documentation: "Get value from array at index.",
    insertText: "array.get(${1:array}, ${2:index})",
  },
  {
    label: "array.size",
    kind: 1,
    detail: "array.size(array) -> int",
    documentation: "Get array size.",
    insertText: "array.size(${1:array})",
  },
  {
    label: "request.security",
    kind: 1,
    detail: "request.security(symbol, timeframe, expression) -> series",
    documentation: "Request security data from different symbol/timeframe.",
    insertText:
      'request.security(${1:syminfo.tickerid}, "${2:timeframe}", ${3:expression})',
  },
  {
    label: "plot",
    kind: 1,
    detail: "plot(series, title, color, linewidth) -> plot",
    documentation: "Plot a series on the chart.",
    insertText:
      'plot(${1:series}, title="${2:Title}", color=${3:color.blue}, linewidth=${4:1})',
  },
  {
    label: "plotshape",
    kind: 1,
    detail: "plotshape(condition, title, location, color, style, size) -> plot",
    documentation: "Plot shapes on the chart.",
    insertText:
      'plotshape(${1:condition}, title="${2:Title}", location=location.${3:belowbar}, color=${4:color.red}, style=shape.${5:triangleup}, size=${6:size.small})',
  },
  {
    label: "label.new",
    kind: 1,
    detail: "label.new(x, y, text, color, textcolor, style) -> label",
    documentation: "Create a new label.",
    insertText:
      'label.new(${1:x}, ${2:y}, "${3:text}", color=${4:color.blue}, textcolor=${5:color.white}, style=label.style_${6:label_up})',
  },
  {
    label: "line.new",
    kind: 1,
    detail: "line.new(x1, y1, x2, y2, color, width, extend) -> line",
    documentation: "Create a new line.",
    insertText:
      "line.new(${1:x1}, ${2:y1}, ${3:x2}, ${4:y2}, color=${5:color.blue}, width=${6:1}, extend=extend.${7:none})",
  },
  {
    label: "box.new",
    kind: 1,
    detail: "box.new(left, top, right, bottom, border_color, bgcolor) -> box",
    documentation: "Create a new box.",
    insertText:
      "box.new(${1:left}, ${2:top}, ${3:right}, ${4:bottom}, border_color=${5:color.blue}, bgcolor=${6:color.new(color.blue, 80)})",
  },
  {
    label: "input.bool",
    kind: 1,
    detail: "input.bool(defval, title, group, tooltip) -> input bool",
    documentation: "Create a boolean input.",
    insertText: 'input.bool(${1:true}, "${2:Label}", group="${3:Group}")',
  },
  {
    label: "input.float",
    kind: 1,
    detail:
      "input.float(defval, title, minval, maxval, step, group, tooltip) -> input float",
    documentation: "Create a float input.",
    insertText:
      'input.float(${1:0.0}, "${2:Label}", minval=${3:0.0}, maxval=${4:100.0}, step=${5:0.1}, group="${6:Group}")',
  },
  {
    label: "input.int",
    kind: 1,
    detail:
      "input.int(defval, title, minval, maxval, step, group, tooltip) -> input int",
    documentation: "Create an integer input.",
    insertText:
      'input.int(${1:14}, "${2:Label}", minval=${3:1}, maxval=${4:100}, group="${5:Group}")',
  },
  {
    label: "input.string",
    kind: 1,
    detail: "input.string(defval, title, group, tooltip) -> input string",
    documentation: "Create a string input.",
    insertText:
      'input.string("${1:default}", "${2:Label}", group="${3:Group}")',
  },
  {
    label: "input.color",
    kind: 1,
    detail: "input.color(defval, title, group, tooltip) -> input color",
    documentation: "Create a color input.",
    insertText:
      'input.color(color.new(color.${1:blue}, ${2:0}), "${3:Label}", group="${4:Group}")',
  },
  {
    label: "strategy.entry",
    kind: 1,
    detail: "strategy.entry(id, direction, qty, when) -> void",
    documentation: "Strategy entry order.",
    insertText:
      'strategy.entry("${1:Entry ID}", strategy.${2:long}, qty=${3:1}, when=${4:condition})',
  },
  {
    label: "strategy.exit",
    kind: 1,
    detail: "strategy.exit(id, from_entry, profit, loss) -> void",
    documentation: "Strategy exit order.",
    insertText:
      'strategy.exit("${1:Exit ID}", from_entry="${2:Entry ID}", profit=${3:100}, loss=${4:50})',
  },
  {
    label: "strategy.close",
    kind: 1,
    detail: "strategy.close(id, when) -> void",
    documentation: "Close strategy position.",
    insertText: 'strategy.close("${1:Entry ID}", when=${2:condition})',
  },
  {
    label: "alert",
    kind: 1,
    detail: "alert(message, freq) -> void",
    documentation: "Create an alert.",
    insertText: 'alert("${1:Message}", alert.freq_${2:once_per_bar})',
  },
  {
    label: "alertcondition",
    kind: 1,
    detail: "alertcondition(condition, title, message) -> void",
    documentation: "Create an alert condition.",
    insertText:
      'alertcondition(${1:condition}, title="${2:Alert Title}", message="${3:Alert Message}")',
  },
  {
    label: "color.new",
    kind: 1,
    detail: "color.new(color, transparency) -> color",
    documentation: "Create a new color with transparency (0-100).",
    insertText: "color.new(${1:color.blue}, ${2:0})",
  },
  {
    label: "nz",
    kind: 1,
    detail: "nz(value, replacement) -> series",
    documentation: "Replace NA values with replacement value.",
    insertText: "nz(${1:value}, ${2:0})",
  },
];

export const builtinVariables: PineScriptCompletion[] = [
  {
    label: "open",
    kind: 6,
    detail: "series float",
    documentation: "Opening price of the current bar.",
  },
  {
    label: "high",
    kind: 6,
    detail: "series float",
    documentation: "Highest price of the current bar.",
  },
  {
    label: "low",
    kind: 6,
    detail: "series float",
    documentation: "Lowest price of the current bar.",
  },
  {
    label: "close",
    kind: 6,
    detail: "series float",
    documentation: "Closing price of the current bar.",
  },
  {
    label: "volume",
    kind: 6,
    detail: "series int",
    documentation: "Volume of the current bar.",
  },
  {
    label: "time",
    kind: 6,
    detail: "series int",
    documentation: "Unix timestamp of the current bar.",
  },
  {
    label: "timenow",
    kind: 6,
    detail: "int",
    documentation: "Current time as Unix timestamp.",
  },
  {
    label: "bar_index",
    kind: 6,
    detail: "series int",
    documentation: "Index of the current bar (zero-based).",
  },
  {
    label: "syminfo.ticker",
    kind: 6,
    detail: "string",
    documentation: "Ticker symbol of the current chart.",
  },
  {
    label: "syminfo.tickerid",
    kind: 6,
    detail: "string",
    documentation: "Full ticker ID including exchange.",
  },
  {
    label: "syminfo.prefix",
    kind: 6,
    detail: "string",
    documentation: "Exchange prefix.",
  },
  {
    label: "syminfo.root",
    kind: 6,
    detail: "string",
    documentation: "Root symbol without exchange.",
  },
  {
    label: "syminfo.basecurrency",
    kind: 6,
    detail: "string",
    documentation: "Base currency of the symbol.",
  },
  {
    label: "syminfo.currency",
    kind: 6,
    detail: "string",
    documentation: "Quote currency of the symbol.",
  },
];

export const keywords: PineScriptCompletion[] = [
  {
    label: "if",
    kind: 14,
    detail: "keyword",
    documentation: "Conditional statement.",
  },
  {
    label: "else",
    kind: 14,
    detail: "keyword",
    documentation: "Else clause.",
  },
  {
    label: "elseif",
    kind: 14,
    detail: "keyword",
    documentation: "Else-if clause.",
  },
  {
    label: "for",
    kind: 14,
    detail: "keyword",
    documentation: "For loop.",
  },
  {
    label: "while",
    kind: 14,
    detail: "keyword",
    documentation: "While loop.",
  },
  {
    label: "var",
    kind: 14,
    detail: "keyword",
    documentation: "Variable declaration that persists across bars.",
  },
  {
    label: "varip",
    kind: 14,
    detail: "keyword",
    documentation:
      "Variable declaration that persists across bars and repaints.",
  },
  {
    label: "function",
    kind: 14,
    detail: "keyword",
    documentation: "Function declaration.",
  },
  {
    label: "return",
    kind: 14,
    detail: "keyword",
    documentation: "Return from function.",
  },
  {
    label: "true",
    kind: 14,
    detail: "keyword",
    documentation: "Boolean true.",
  },
  {
    label: "false",
    kind: 14,
    detail: "keyword",
    documentation: "Boolean false.",
  },
  {
    label: "na",
    kind: 14,
    detail: "keyword",
    documentation: "Not available value.",
  },
  {
    label: "and",
    kind: 14,
    detail: "keyword",
    documentation: "Logical AND operator.",
  },
  {
    label: "or",
    kind: 14,
    detail: "keyword",
    documentation: "Logical OR operator.",
  },
  {
    label: "not",
    kind: 14,
    detail: "keyword",
    documentation: "Logical NOT operator.",
  },
];

export const types: PineScriptCompletion[] = [
  {
    label: "int",
    kind: 7,
    detail: "type",
    documentation: "Integer type.",
  },
  {
    label: "float",
    kind: 7,
    detail: "type",
    documentation: "Floating-point number type.",
  },
  {
    label: "bool",
    kind: 7,
    detail: "type",
    documentation: "Boolean type.",
  },
  {
    label: "color",
    kind: 7,
    detail: "type",
    documentation: "Color type.",
  },
  {
    label: "string",
    kind: 7,
    detail: "type",
    documentation: "String type.",
  },
  {
    label: "array",
    kind: 7,
    detail: "type",
    documentation: "Array type.",
  },
  {
    label: "matrix",
    kind: 7,
    detail: "type",
    documentation: "Matrix type.",
  },
  {
    label: "map",
    kind: 7,
    detail: "type",
    documentation: "Map type.",
  },
  {
    label: "line",
    kind: 7,
    detail: "type",
    documentation: "Line object type.",
  },
  {
    label: "label",
    kind: 7,
    detail: "type",
    documentation: "Label object type.",
  },
  {
    label: "box",
    kind: 7,
    detail: "type",
    documentation: "Box object type.",
  },
  {
    label: "table",
    kind: 7,
    detail: "type",
    documentation: "Table object type.",
  },
];
