import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers/index';
import App from './App';
import './styles/index.css';
import './styles/loader.css';
import './styles/panel.css';
import './styles/about.css';
import './styles/homepage.css';
import './styles/layers.css';

import "cesium/Source/Widgets/widgets.css";

import buildModuleUrl from "cesium/Source/Core/buildModuleUrl";

buildModuleUrl.setBaseUrl('./cesium/');

const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
