import { combineReducers } from 'redux';
import swagger from './swagger';
import documents from './documents';

const rootReducer = combineReducers({
  swagger,
  documents,
});

export default rootReducer;
