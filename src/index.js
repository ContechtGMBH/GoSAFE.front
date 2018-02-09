import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import allReducers from './reducers/index';
import App from './App';
import './styles/index.css';
import './styles/loader.css';
import './styles/panel.css';
import './styles/about.css';
import './styles/homepage.css';
import './styles/tracks.css';
import './styles/feature-info.css';
import './styles/statistics.css';
import './styles/railml.css';

import "cesium/Source/Widgets/widgets.css";

import buildModuleUrl from "cesium/Source/Core/buildModuleUrl";

buildModuleUrl.setBaseUrl('./cesium/');

const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
