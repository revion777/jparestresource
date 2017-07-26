export const GET_DOCUMENTS = 'documenteditor/getDocuments/GET_DOCUMENTS';
export const GET_DOCUMENTS_START = 'documenteditor/getDocuments/GET_DOCUMENTS_START';
export const GET_DOCUMENTS_FINISH = 'documenteditor/getDocuments/GET_DOCUMENTS_FINISH';
export const GET_DOCUMENTS_ERROR = 'documenteditor/getDocuments/GET_DOCUMENTS_ERROR';

export function getDocuments({ callback }) {
  return {
    type: GET_DOCUMENTS,
    callback,
  };
}

export function getDocumentsStart() {
  return {
    type: GET_DOCUMENTS_START,
  };
}

export function getDocumentsFinish(value) {
  return {
    type: GET_DOCUMENTS_FINISH,
    value,
  };
}

export function getDocumentsError(error) {
  return {
    type: GET_DOCUMENTS_ERROR,
    error,
  };
}

