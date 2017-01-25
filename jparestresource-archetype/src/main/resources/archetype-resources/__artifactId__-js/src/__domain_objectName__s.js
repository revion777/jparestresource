#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
import React, { Component } from 'react';
import { Checkbox, Form, Table, Message } from 'semantic-ui-react'
//import Link from 'react-router';
//import './css/${domain_objectName}s.css';

class Filtrable${domain_objectName}sTable extends Component {

  componentDidMount() {
    this.load${domain_objectName}s();
  }

  constructor(props) {
    super(props);
    let query = this.props.location.query;
    this.state = {
      ${domain_packageName}: null,
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
  load${domain_objectName}s() {
    var url = "/${artifactId}-web/web/${domain_packageName}";
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
          this.setState({${domain_packageName}: response.document, errText: null});
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
    //console.log(this.state.${domain_packageName});
    return (
      <div>
        <SearchBar
          filter={this.state.filter}
          onChange={this.filterOnChangeHandler}
        />
        {(this.state.${domain_packageName}) &&
          <${domain_objectName}sTable
            ${domain_packageName}={this.state.${domain_packageName}}
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
          label='Show deleted ${domain_packageName}'
          onChange={() => {props.onChange('showDeleted', !props.filter.showDeleted);}}
        />
      </Form.Field>
    </Form>
  );
};

function ${domain_objectName}sTable (props) {
  if (!props.${domain_packageName}.length) {
    return (<Message warning>Документы не найдены</Message>);
  }
  return (
    <Table striped celled>
      <caption>List of ${domain_objectName}s</caption>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.${domain_packageName}.map((document, index) => (
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

export default Filtrable${domain_objectName}sTable;
