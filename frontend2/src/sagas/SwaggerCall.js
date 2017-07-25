import { put } from 'redux-saga/effects';
import propOr from 'lodash/fp/propOr';

const parseError = (error) => {
  return typeof error === 'string' ? error :
    error.status === 403 ? 'Ошибка авторизации. Обновите страницу и попробуйте ещё раз' :
    error.statusText || error.data || error.message || 'Внутренняя ошибка приложения';
};

const makeSwaggerRequest = ({ request, method, swaggerClient }) => {
  const fetchMethod = propOr(null, method)(swaggerClient);
  if (fetchMethod) {
    return fetchMethod(request);
  } else {
    throw new Error(`Swagger api method doesn't exist: ${method}`);
  }
};

export default function* asyncSwagger({ request, method, onStart, onFinish, onError, swaggerClient, callback, responseInterceptor, errorInterceptor }) {
  const result = { status: 'pending' };
  if (onStart) yield put(onStart(request));
  try {
    // yield new Promise(resolve => { setTimeout(resolve, 3000); })
    const res = yield makeSwaggerRequest({ request, method, swaggerClient });
    let response = null;
    if (responseInterceptor && typeof responseInterceptor === 'function') {
      response = responseInterceptor(res, request);
    } else {
      response = res.obj;
    }
    if (onFinish) yield put(onFinish(response, request));
    result.status = 'ok';
    result.value = response;
  } catch (err) {
    let errorMsg = parseError(err);
    if (errorInterceptor && typeof errorInterceptor === 'function') {
      errorMsg = errorInterceptor(err, errorMsg);
    }
    if (onError) yield put(onError(errorMsg, request));
    result.status = 'error';
    result.message = errorMsg;
  }
  if (callback && typeof callback === 'function') {
    callback(result, request);
  }
  return result;
}
