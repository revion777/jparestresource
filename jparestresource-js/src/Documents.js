import React, { Component } from 'react';
//import Link from 'react-router';
//import './css/Documents.css';

class FiltrableDocumentsTable extends Component {

  componentDidMount() {
    this.loadDocuments();
  }

  constructor(props) {
    super(props);
    this.state = {
      documents: null,
      errText: null,
      fiterDisplayName: '',
      showDeleted: false
    };
    let query = this.props.location.query;

    if (query.displayName) {
      this.state.fiterDisplayName = query.displayName;
    }
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
  /**
   *  Загрузка данных о документах
   */
  loadDocuments() {
    var url = "/jparestresource-web/web/documents";
    if (this.state.fiterDisplayName) {
      url += "?filter=displayName==" + this.state.fiterDisplayName;
    }
    console.log("fetch url:" + url);

    fetch(url, {
      method: "GET",
      credentials: 'same-origin',
      headers: {
        "Accept": "application/json"
      }
    })
      .then(this.checkStatus)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response !== undefined && response.document !== undefined) {
          this.setState({documents: response.document, errText: null});
        }

        return;
      })
      .catch((ex) => {

        if (ex.response !== undefined) {
          ex.response.text().then((errorMsg) => {
            this.setState({errText: errorMsg});
          });
        } else {
          this.setState({errText: ex.message});
        }
      });
  }
  render() {
    //console.log(this.state.documents);
    return (
      <div>
          <SearchBar
              fiterDisplayName={this.state.fiterDisplayName}
              showDeleted={this.state.showDeleted}
              />    
          {this.state.documents &&
              <DocumentsTable
                  documents={this.state.documents}
                  />
          }
          {this.state.errText &&
              <div className="ui red message">Ошибка запроса списка документов: {this.state.errText}</div>
          }
      
      </div>
      );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
          <input
              type="text"
              name="displayName"
              placeholder="Search, may use * and ?..."
              defaultValue={this.props.fiterDisplayName}
              ref={(input) => this.fiterDisplayNameInput = input}
              />
          <button type="submit">Submit</button>
          <p>
              <input
                  type="checkbox"
                  checked={this.props.showDeleted}
                  ref={(input) => this.showDeletedInput = input}
                  />
              {' '}
              Show deleted documents
          </p>
      </form>
      );
  }
}

class DocumentsTable extends Component {
  render() {
    const documents = this.props.documents;
    return (
      <div className="DocumentsTable">
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
      </div>
      );
  }
}

export default FiltrableDocumentsTable;
