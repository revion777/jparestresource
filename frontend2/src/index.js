import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
// import 'whatwg-fetch';
import Root from './Routes';
import configureStore from './store/configureStore';
import StoreProvider from './providers/Store';

const store = configureStore();

let renderAll;
// localStorage.debug = process.env.NODE_ENV === 'production' ? 'app:*' : 'app:*,dbg:*';

if (process.env.NODE_ENV === 'production') {
  renderAll = (Root) => render(
    (<Provider store={store}>
      <StoreProvider store={store}>
        <Root/>
      </StoreProvider>
    </Provider>),
    document.getElementById('root')
  );
} else {
  const DevTools = require('./containers/DevTools').default;
  renderAll = (Root) => render(
    (<Provider store={store}>
      <StoreProvider store={store}>
        <div>
          <Root/>
          <DevTools/>
        </div>
      </StoreProvider>
    </Provider>),
    document.getElementById('root')
  );
  module.hot.accept('./Routes', () => {
    const Root = require('./Routes').default;
    renderAll(Root);
  });
}

renderAll(Root);
