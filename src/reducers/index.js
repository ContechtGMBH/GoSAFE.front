import {combineReducers} from 'redux';

import TestReducers from './reducer-test';
import PanelReducers from './reducer-panel';
import AboutReducers from './reducer-about';

export const allReducers = combineReducers({
  test: TestReducers,
  panel: PanelReducers,
  about: AboutReducers
});

export default allReducers;
