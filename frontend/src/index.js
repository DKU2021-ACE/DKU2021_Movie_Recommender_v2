import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import reducer from './_reducers';

// 미들웨어 2개(redux-promis, redux-thunk)와 함께 redux store 생성
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(createStore)

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>
  , document.getElementById('root')
);