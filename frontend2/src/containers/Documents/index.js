import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { watchGetDocuments } from '../../sagas/GetDocumentsSaga';
import * as GetDocumentsActions from '../../actions/GetDocumentsActions';
import DocumentsTable from '../../components/Documents';

const mapStateToProps = (state) => ({
  documents: state.documents,
});

const mapDispatchToProps = dispatch => {
  return {
    getDocumentsActions: bindActionCreators(GetDocumentsActions, dispatch),
  };
};

class Documents extends Component {
  //state = { submitButton: null };

  static propTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    swaggerClient: PropTypes.object.isRequired,
    documents: PropTypes.object.isRequired,
    getDocumentsActions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { store, swaggerClient,getDocumentsActions } = this.props;
    store.runSaga(watchGetDocuments, { swaggerClient });
    getDocumentsActions.getDocuments({});
  }

  componentWillUnmount() {
    const { store } = this.props;
    store.stopSagaByName(watchGetDocuments.sagaID);
  }

  render() {
    const {
      documents } = this.props;
    //const { operationUid } = router.location.query;

    return(
      <div> 
          <DocumentsTable documents={documents.value} removeDocument={()=>{}} />
      </div>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  getContext({
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    swaggerClient: PropTypes.object.isRequired,
  }),
  pure,
)(Documents);
