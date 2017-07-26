import { put, call, takeEvery } from 'redux-saga/effects';
import { GET_DOCUMENTS, getDocumentsStart, getDocumentsFinish, getDocumentsError } from '../actions/GetDocumentsActions';
import SwaggerCall from './SwaggerCall';

function* getDocuments(swaggerClient, action) {
  const { callback } = action;
  // console.log('start getDocuments', operationUid);
  const request = {  };

  try {

    const  method = 'documents.list';
    yield call(SwaggerCall, {
      request, method,
      onStart: getDocumentsStart,
      onFinish: getDocumentsFinish,
      onError: getDocumentsError,
      swaggerClient,
      callback,
    });

  } catch (error) {
    yield put(getDocumentsError(error, request));
  }
}

export function* watchGetDocuments({ swaggerClient }) {
  yield takeEvery(GET_DOCUMENTS, getDocuments, swaggerClient);
}
watchGetDocuments.sagaID = 'documenteditor/documents/watchGetDocuments';
