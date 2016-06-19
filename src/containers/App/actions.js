export function mouseMove(x, y) {
  return {
    type: 'MOUSE_MOVE',
    x,
    y,
  };
}

export function mouseUp() {
  return {
    type: 'MOUSE_UP',
  };
}

export function dragWindowStart(x, y) {
  return {
    type: 'DRAG_WINDOW_START',
    x,
    y,
  };
}

export function resizeWindowStart(x, y) {
  return {
    type: 'RESIZE_WINDOW_START',
    x,
    y,
  };
}

