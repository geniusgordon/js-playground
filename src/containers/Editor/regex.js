const keywords = {
  keyword:
    'in of if for while finally var new do return void else break catch ' +
    'instanceof with throw case default try this switch continue typeof delete ' +
    'let yield const export super debugger as async await static ' +
    'import from as',
  literal: 'true false null undefined NaN Infinity',
  builtIn:
    'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' +
    'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' +
    'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' +
    'TypeError URIError Number Math Date String RegExp Array Float32Array ' +
    'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' +
    'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' +
    'module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect ' +
    'Promise',
};

function buildRegex(string) {
  const regex = string.split(' ').map((k) => `\\b${k}\\b`).join('|');
  return new RegExp(regex, 'g');
}

const rules = [{
  type: 'comment',
  regex: /\/\/.*($|\n)/g,
}, {
  type: 'comment',
  regex: /\/\*(.|\n)*\*\//g,
}, {
  type: 'string',
  regex: /'.*'|".*"/g,
}, {
  type: 'string',
  regex: /`(.|\n)*`/g,
}, {
  type: 'number',
  regex: /(-?)(\b0[xX][a-fA-F0-9]+|(\b\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)\b/g,
}, {
  type: 'number',
  regex: /\b(0b[01]+)\b/g,
}, {
  type: 'function',
  regex: /\bfunction\b/g,
}];

Object.keys(keywords).forEach((key) => {
  rules.push({
    type: key,
    regex: buildRegex(keywords[key]),
  });
});

export default rules;

