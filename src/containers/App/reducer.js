import { handleActions } from 'redux-actions';

const initialState = {
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  dragStartLeft: 0,
  dragStartTop: 0,
  left: 100,
  top: 100,
};

const reducer = handleActions({
  DRAG_WINDOW: (state, action) => {
    if (!state.isDragging) {
      return state;
    }
    return {
      ...state,
      left: state.dragStartLeft + (action.x - state.dragStartX),
      top: state.dragStartTop + (action.y - state.dragStartY),
    };
  },
  DRAG_WINDOW_START: (state, action) => ({
    ...state,
    isDragging: true,
    dragStartX: action.x,
    dragStartY: action.y,
    dragStartLeft: state.left,
    dragStartTop: state.top,
  }),
  DRAG_WINDOW_END: (state) => ({
    ...state,
    isDragging: false,
  }),
}, initialState);

export default reducer;

