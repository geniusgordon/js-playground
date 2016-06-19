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
      store.replaceReducer(nextReducer);
    });
  }
  /* eslint-enable global-require */

  return store;
}

