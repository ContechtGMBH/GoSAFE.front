import {combineReducers} from 'redux';

import LayersReducers from './reducer-layers';
import PanelReducers from './reducer-panel';
import AboutReducers from './reducer-about';
import DataSourcesReducers from './reducer-datasources';

export const allReducers = combineReducers({
  layers: LayersReducers,
  panel: PanelReducers,
  about: AboutReducers,
  dataSources: DataSourcesReducers
});

export default allReducers;
