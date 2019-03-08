import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from './containers/app';
import {reducer} from './reducers/reducer';

import {createStore} from 'redux';

export const store = createStore(reducer);

const application = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(application, document.querySelector('#app')
);
