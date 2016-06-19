import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './Root';
import configureStore from './store';

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
);

/* eslint-disable global-require */
if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root').default;
    render(
      <NextRoot store={store} />,
      document.getElementById('root')
    );
  });
}

