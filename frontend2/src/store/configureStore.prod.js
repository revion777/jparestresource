import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import enhanceStoreToControlSagas from './enhanceStoreToControlSagas';
import sagaMonitor from './sagaMonitor';

const sagaMiddleware = createSagaMiddleware({sagaMonitor});

const enhancer = applyMiddleware(sagaMiddleware);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  enhanceStoreToControlSagas(store, sagaMiddleware);
  return store;
}
