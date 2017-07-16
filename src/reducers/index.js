import {combineReducers} from 'redux';

import LayersReducers from './reducer-layers';
import PanelReducers from './reducer-panel';
import AboutReducers from './reducer-about';

export const allReducers = combineReducers({
  layers: LayersReducers,
  panel: PanelReducers,
  about: AboutReducers
});

export default allReducers;
