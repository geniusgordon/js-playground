import { handleActions } from 'redux-actions';

const initialState = {
  logs: [],
};

const reducer = handleActions({
  CONSOLE_LOG: (state, action) => ({
    ...state,
    logs: [...state.logs, {
      type: 'log',
      value: action.log,
    }],
  }),
  CLEAR_LOG: (state) => ({
    ...state,
    logs: [],
  }),
  RUNTIME_ERROR: (state, action) => ({
    ...state,
    logs: [...state.logs, {
      type: 'error',
      value: `${action.name}: ${action.message}`,
    }],
  }),
}, initialState);

export default reducer;

