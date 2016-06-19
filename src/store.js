import { createStore, compose } from 'redux';
import reducer from './reducers';
import DevTools from './DevTools';

export default function configureStore() {
  const store = createStore(
    reducer,
    compose(
      DevTools.instrument()
    )
  );
  /* eslint-disable global-require */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;
      const decorator = require('./containers/Editor/decorator').default;
      console.log(decorator);
      store.replaceReducer(nextReducer);
      store.dispatch({
        type: 'DECORATOR_HOT_RELOAD',
        decorator,
      });
    });
  }
  /* eslint-enable global-require */

  return store;
}

