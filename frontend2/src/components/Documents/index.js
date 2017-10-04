import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Form, Table, Message, Button } from 'semantic-ui-react';
import { Link } from 'react-router';


function DocumentsTable (props) {
  if (!props.documents || !props.documents.document || !props.documents.document.length) {
    return (<Message warning>Документы не найдены</Message>);
  }
  return (
    <Table striped celled selectable compact size="small">
      <caption>List of Documents</caption>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell collapsing>Id</Table.HeaderCell>
          <Table.HeaderCell collapsing>Date</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell collapsing/>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.documents.document.map((document, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              {document.id}
            </Table.Cell>
            <Table.Cell>
              {(document.docDate || '').split('-').reverse().join('.')}
            </Table.Cell>
            <Table.Cell>
              <Link to={`/documents/${document.id}`} activeStyle={{ color: 'red' }}>{document.displayName || '-'}</Link>
            </Table.Cell>
            <Table.Cell width="1">
              <Button icon="remove" color="red" size="mini" fluid
                onClick={props.removeDocument.bind(null, document.id)}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

DocumentsTable.propTypes = {
  documents: PropTypes.array,
  removeDocument: PropTypes.func.isRequired,
};


export default DocumentsTable;

