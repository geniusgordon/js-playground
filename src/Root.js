import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import DevTools from './DevTools';

const renderDevTools = () => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  return <DevTools />;
};

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <App />
      {renderDevTools()}
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object,
};

export default Root;

