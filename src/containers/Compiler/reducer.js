import { handleActions } from 'redux-actions';

const initialState = {
  error: null,
};

const reducer = handleActions({
  RUNTIME_ERROR: (state, action) => ({
    ...state,
    error: action.error,
  }),
}, initialState);

export default reducer;

