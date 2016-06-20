import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import reducer from './reducers';
import DevTools from './DevTools';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(sagaMiddleware),
      DevTools.instrument()
    )
  );
  sagaMiddleware.run(sagas, store);

  /* eslint-disable global-require */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;
      const decorator = require('./containers/Editor/decorator').default;
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

