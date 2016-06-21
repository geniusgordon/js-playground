export function matchesKey(key, event) {
  if (!key) {
    return false;
  }
  const charCode = event.keyCode || event.which;
  const ch = String.fromCharCode(charCode);
  return key.name.toUpperCase() === ch.toUpperCase() &&
    key.alt === event.altKey &&
    key.ctrl === event.ctrlKey &&
    key.meta === event.metaKey &&
    key.shift === event.shiftKey;
}

