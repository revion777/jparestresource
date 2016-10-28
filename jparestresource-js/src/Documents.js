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
      filterText: '',
      showDeleted: false
    };

    this.handleUserInput = this.handleUserInput.bind(this);
  }
  handleUserInput(filterText, showDeleted) {
    this.setState({
      filterText: filterText,
      showDeleted: showDeleted
    });
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
   *  Загрузка данных о документаз
   */
  loadDocuments() {
    var url = "/jparestresource-web/web/documents";
    if(this.state.filterText){
      url+="?filter=displayName=="+this.state.filterText;
    }
    console.log(url);

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
    console.log(this.state.documents);
    return (
      <div>
          <SearchBar
              filterText={this.state.filterText}
              showDeleted={this.state.showDeleted}
              onUserInput={this.handleUserInput}
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
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onUserInput(
      this.filterTextInput.value,
      this.showDeletedInput.checked
      );
  }

  render() {
    return (
      <form>
          <input
              type="text"
              placeholder="Search..."
              defaultValue={this.props.filterText}
              ref={(input) => this.filterTextInput = input}
              />
              <button type="button" onClick={this.handleChange}>Submit</button>
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
    //console.log("documents=",documents);
    //console.log(this.state.errText);
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
