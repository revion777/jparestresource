export const SWAGGER_INIT_START = 'documenteditor/swagger/SWAGGER_INIT_START';
export const SWAGGER_INIT_FINISH = 'documenteditor/swagger/SWAGGER_INIT_FINISH';
export const SWAGGER_INIT_ERROR = 'documenteditor/swagger/SWAGGER_INIT_ERROR';

export function swaggerInitStart() {
  return {
    type: SWAGGER_INIT_START,
  };
}

export function swaggerInitFinish() {
  return {
    type: SWAGGER_INIT_FINISH,
  };
}

export function swaggerInitError(error) {
  return {
    type: SWAGGER_INIT_ERROR,
    error,
  };
}
