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

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

