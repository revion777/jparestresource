import { END } from 'redux-saga';
// import sagaFetchData from './sagaFetchData';
// import { bindActionCreators } from 'redux';

const regStrSagaName = '^@{0,2}[a-zA-Z0-9_]+(\\/[a-zA-Z0-9_]+)*$';
const regSagaName = new RegExp(regStrSagaName);

export default (instanceStore, sagaMiddleware) => {
  const launchedSagas = {};
  instanceStore.runSaga = (saga, ...args) => {
    if (typeof saga !== 'function') {
      throw new Error('saga should be function');
    }
    if (typeof saga.sagaID !== 'string' || !regSagaName.test(saga.sagaID)) {
      throw new Error(`Property of the saga sagaID should be string and match with RegExp - /${regStrSagaName}/`);
    }
    // If saga isn't launched or saga is cancelled
    if (!launchedSagas[saga.sagaID] || (launchedSagas[saga.sagaID] && !launchedSagas[saga.sagaID].isRunning())) {
      const task = sagaMiddleware.run(saga, ...args);
      launchedSagas[saga.sagaID] = task;
      return task;
    }
  };
  instanceStore.stopSagas = () => instanceStore.store.dispatch(END);
  instanceStore.stopSagaByName = sagaID => {
    if (typeof sagaID !== 'string' || !regSagaName.test(sagaID)) {
      throw new Error(`sagaID should be string and match with RegExp - /${regStrSagaName}/`);
    }
    if (launchedSagas[sagaID]) {
      launchedSagas[sagaID].cancel();
    }
  };
  instanceStore.getLaunchedSagas = () => Object.assign({}, launchedSagas);

  // Run saga fetch data
  // instanceStore.runSaga(sagaFetchData.saga);
  // Save action creator for fetch data in instanceStore
  // instanceStore.fetchData = bindActionCreators(sagaFetchData.action, instanceStore.store.dispatch);

  return instanceStore;
};
