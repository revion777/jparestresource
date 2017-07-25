import { SWAGGER_INIT_START, SWAGGER_INIT_FINISH, SWAGGER_INIT_ERROR } from '../actions/SwaggerActions';

const initialState = {
  loading: false,
  error: null,
  initialized: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SWAGGER_INIT_START:
      return { ...state, loading: true, error: null, initialized: false };
    case SWAGGER_INIT_FINISH:
      return { ...state, loading: false, initialized: true };
    case SWAGGER_INIT_ERROR:
      return { ...state, loading: false, error: action.error || true };
    default:
      return state;
  }
}
