import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { HelmetProvider } from 'react-helmet-async';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import Reducer from './store/Reducer';
import axios from 'axios'
axios.defaults.baseURL=`http://localhost:80/api/`
// Soft UI Context Provider
import { MaterialUIControllerProvider } from "context";
const middleWare = [thunk];
const stateObject = {
  user: [],
  clients: []
}
//console.log(window.location.hostname)
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("state", serializedState);
  } catch (e) {
    //console.log(e);
  }
};
const loadFromLocalStorage = () => {
  try {
    const serializedState = sessionStorage.getItem("state");
    if (serializedState === null)
      return stateObject;
    return JSON.parse(serializedState);
  } catch (e) {
    //console.log(e);
    return stateObject;
  }
};
const initialState = loadFromLocalStorage();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  Reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);
store.subscribe(() => saveToLocalStorage(store.getState()));
ReactDOM.render(
  <Provider store={store}>
  <HelmetProvider>
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>
  </HelmetProvider>
  </Provider>,
  document.getElementById("root")
);




// import Cookies from 'universal-cookie';

// a//xios.defaults.baseURL = process.env.REACT_APP_NODE_ENV === "production" ? `https://${window.location.hostname}:4001/api/` : `http://${window.location.hostname}:4001/api/`;// axios.defaults.baseURL=`http://3.19.228.157:8090/4000/api`
// ----------------------------------------------------------------------



