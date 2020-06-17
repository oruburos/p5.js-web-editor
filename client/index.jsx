import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store';
import routes from './routes';
import i18n from './i18n';

require('./styles/main.scss');


// Load the p5 png logo, so that webpack will use it
require('./images/p5js-square-logo.png');

const history = browserHistory;
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);

const App = () => (
  <Provider store={store}>
    <Router history={history} routes={routes(store)} />
  </Provider>
);

const HotApp = hot(App);

render(
  <Suspense fallback={(<div>Loading locale pack</div>)}>
    <HotApp />
  </Suspense>,
  document.getElementById('root')
);
