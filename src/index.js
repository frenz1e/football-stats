import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
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
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
