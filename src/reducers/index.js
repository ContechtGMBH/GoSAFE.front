import {combineReducers} from 'redux';

import LayersReducers from './reducer-layers';
import PanelReducers from './reducer-panel';
import AboutReducers from './reducer-about';
import DataSourcesReducers from './reducer-datasources';
import FeatureInfoReducers from './reducer-featureinfo';
import EventsReducers from './reducer-events';
import SelectedFeatureReducers from './reducer-selectedfeature';

export const allReducers = combineReducers({
  layers: LayersReducers,
  events: EventsReducers,
  panel: PanelReducers,
  about: AboutReducers,
  dataSources: DataSourcesReducers,
  featureInfo: FeatureInfoReducers,
  selectedFeature: SelectedFeatureReducers 

});

export default allReducers;
