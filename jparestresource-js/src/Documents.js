import React, { Component } from 'react';
import Link from 'react-router'
//import './css/Documents.css';

  class Documents extends Component {

  componentDidMount() {
    this.loadDocuments();
  }

  constructor(props) {
    super(props);
    this.state = {
      documents: null,
      errText: null,
    };
  }
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
  parseJSON(response) {
    return response.json();
  }
  /**
   *  Загрузка данных о документаз
   */
  loadDocuments () {


    var url = "/jparestresource-web/web/documents";

    fetch(url, {
      method: "GET",
      credentials: 'same-origin',
      headers: {
        "Accept": "application/json"
      }
    })
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then((response) => {
        if (response !== undefined && response.document !== undefined) {
          this.setState({documents: response.document, errText: null});
        }

        return;
      })
      .catch((ex) => {

        if (ex.response !== undefined) {
          ex.response.text().then((errorMsg) => {
            console.log(errorMsg);

            this.setState({errText: errorMsg});
          });
        } else {
          this.setState({errText: ex.message});
        }
      });
  }

  render() {
    const documents = this.state.documents;
    //console.log("documents=",documents);
    //console.log(this.state.errText);
    return (
      <div className="Documents">
          {documents && !this.state.errText &&
              <table className="ui celled table">
                  <caption>List of Documents</caption>
                  <thead>
                      <tr>
                          <th>Date</th>
                          <th>Name</th>
                      </tr>
                  </thead>
                  <tbody>
                      {documents.map((document, index) => (
                            <tr key={index}>
                                <td>
                                    {document.docDate.split('-').reverse().join('.')}
                                </td>
                                <td>
                                    {document.displayName}
                                </td>
                            </tr>
                                  ))}
                  </tbody>
              </table>
          }      
          {this.state.errText &&
              <div className="ui red message">Ошибка запроса списка документов: {this.state.errText}</div> }
      </div>
      );
  }
}
;

export default Documents;
