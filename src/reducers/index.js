import {combineReducers} from 'redux';

import TestReducers from './reducer-test';

export const allReducers = combineReducers({
  test: TestReducers
});

export default allReducers;
