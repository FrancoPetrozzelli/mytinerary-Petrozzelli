import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import mainReducer from './redux/reducers/mainReducer'
import thunk from 'redux-thunk' 

const reduxStore = createStore(mainReducer, applyMiddleware(thunk))

ReactDOM.render(
  
  <React.StrictMode>
    <Provider store={reduxStore}>
    <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
