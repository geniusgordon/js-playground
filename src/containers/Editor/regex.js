export const IDENTIFIER = /[a-zA-Z_]\w*/;

// 0x..., 0..., decimal, float
export const NUMBER = /(-?)(\b0[xX][a-fA-F0-9]+|(\b\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)/;

// 0b...
export const BINARY = /\b(0b[01]+)/;

export const REGEX = /\b\/.+\//;

