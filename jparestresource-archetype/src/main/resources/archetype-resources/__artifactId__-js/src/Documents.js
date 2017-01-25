#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
import React, { Component } from 'react';
import { Checkbox, Form, Table, Message } from 'semantic-ui-react'
//import Link from 'react-router';
//import './css/Documents.css';

class FiltrableDocumentsTable extends Component {

  componentDidMount() {
    this.loadDocuments();
  }

  constructor(props) {
    super(props);
    let query = this.props.location.query;
    this.state = {
      documents: null,
      errText: null,
      filter: {
        displayName: query.displayName ? query.displayName : '',
        showDeleted: query.showDeleted === 'on',
      }
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
  /**
   *  Загрузка данных о документах
   */
  loadDocuments() {
    var url = "/${artifactId}-web/web/documents";
    if (this.state.filter.displayName) {
      url += "?filter=displayName==" + this.state.filter.displayName;
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

  filterOnChangeHandler = (name, value) => {
    const filter = Object.assign(this.state.filter, { [name]: value } );
    this.setState({ filter });
  };

  render() {
    //console.log(this.state.documents);
    return (
      <div>
        <SearchBar
          filter={this.state.filter}
          onChange={this.filterOnChangeHandler}
        />
        {(this.state.documents) &&
          <DocumentsTable
            documents={this.state.documents}
          />
        }
        {this.state.errText &&
          <Message error>Ошибка запроса списка документов: {this.state.errText}</Message>
        }

      </div>
    );
  }
}

const SearchBar = (props) => {
  return (
    <Form>
      <Form.Field inline>
        <Form.Input
          type="text"
          name="displayName"
          action='Submit'
          placeholder='Search, may use * and ?...'
          value={props.filter.displayName}
          onChange={(e) => {props.onChange('displayName', e.target.value);}}
        />
        <Checkbox
          name="showDeleted"
          defaultChecked={props.filter.showDeleted}
          label='Show deleted documents'
          onChange={() => {props.onChange('showDeleted', !props.filter.showDeleted);}}
        />
      </Form.Field>
    </Form>
  );
};

function DocumentsTable (props) {
  if (!props.documents.length) {
    return (<Message warning>Документы не найдены</Message>);
  }
  return (
    <Table striped celled>
      <caption>List of Documents</caption>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.documents.map((document, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              {document.docDate.split('-').reverse().join('.')}
            </Table.Cell>
            <Table.Cell>
              {document.displayName}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default FiltrableDocumentsTable;
