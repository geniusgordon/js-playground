import { handleActions } from 'redux-actions';

const initialState = {
  start: [0, 0],
  isDragging: false,
  isResizing: false,
  dragStart: [0, 0],
  resizeStart: [0, 0],
  left: 100,
  top: 100,
  width: 600,
  height: 400,
  visible: true,
};

const reducer = handleActions({
  MOUSE_MOVE: (state, action) => {
    if (state.isDragging) {
      return {
        ...state,
        left: state.dragStart[0] + (action.x - state.start[0]),
        top: state.dragStart[1] + (action.y - state.start[1]),
      };
    }
    if (state.isResizing) {
      const width = state.resizeStart[0] + (action.x - state.start[0]);
      const height = state.resizeStart[1] + (action.y - state.start[1]);
      return {
        ...state,
        width: width > 300 ? width : 300,
        height: height > 300 ? height : 300,
      };
    }
    return state;
  },
  MOUSE_UP: (state) => ({
    ...state,
    isDragging: false,
    isResizing: false,
  }),
  DRAG_WINDOW_START: (state, action) => ({
    ...state,
    start: [action.x, action.y],
    isDragging: true,
    dragStart: [state.left, state.top],
  }),
  RESIZE_WINDOW_START: (state, action) => ({
    ...state,
    start: [action.x, action.y],
    isResizing: true,
    resizeStart: [state.width, state.height],
  }),
  TOGGLE_WINDOW: (state) => ({
    ...state,
    visible: !state.visible,
  }),
}, initialState);

export default reducer;

