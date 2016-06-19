export function dragWindow(x, y) {
  return {
    type: 'DRAG_WINDOW',
    x,
    y,
  };
}

export function dragWindowStart(x, y) {
  return {
    type: 'DRAG_WINDOW_START',
    x,
    y,
  };
}

export function dragWindowEnd() {
  return {
    type: 'DRAG_WINDOW_END',
  };
}

