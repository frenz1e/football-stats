import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import * as reducers from './reducers/index';
import Routes from './routes';

const reducer = combineReducers({
  ...reducers
});

const logger = createLogger();
const store = createStore(reducer, compose(
	  applyMiddleware(promise, logger),
	  window.devToolsExtension ? window.devToolsExtension() : f => f
	))

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('App')
);