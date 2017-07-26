import {
  GET_DOCUMENTS_START, GET_DOCUMENTS_FINISH, GET_DOCUMENTS_ERROR,
} from '../actions/GetDocumentsActions';

const initialState = {
  loading: false,
  error: null,
  value: undefined,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DOCUMENTS_START:
      return { ...state, loading: true, error: null, value: null };
    case GET_DOCUMENTS_FINISH:
      return { ...state, loading: false, value: action.value };
    case GET_DOCUMENTS_ERROR:
      return { ...state, loading: false, error: action.error || 'Внутренняя ошибка приложения' };
    default:
      return state;
  }
}
