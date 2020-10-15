import React from 'react';
import { Button, Table, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

function TodoTable ({ todos }) {
    if (!Object.keys(todos).length) {
        return (
            <div>Ajoutez des todos !</div>
        );
    }
    return (
        <Row className="justify-content-center">
            <Col lg={10}>
                <Table borderless size="md">
                    <thead>
                        <tr>
                            <th><FormattedMessage id="todoTable.task"/></th>
                            <th className="d-none d-sm-table-cell">Description</th>
                            <th><FormattedMessage id="todoTable.date"/></th>
                            <th><Button variant="primary"><FontAwesomeIcon icon={faPlus}/><span className="d-none d-sm-inline">Add</span></Button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo, index) => (
                            <tr className="border-top" key={index}>
                                <td className="border-right align-middle">{todo.name}</td>
                                <td className="align-middle d-none d-sm-table-cell"><div>{todo.description}</div></td>
                                <td className="w-25 border-right border-left align-middle">
                                    <div>{todo.date.slice(0, 10).split('-').reverse().join('/')}</div>
                                    <div>{todo.date.slice(11, 16)}</div>
                                </td>
                                <td className="w-25 align-middle">
                                    <Button className="mr-1" size="sm" variant="success"><FontAwesomeIcon icon={faCheck}/></Button>
                                    <Button className="mr-1" size="sm"><FontAwesomeIcon icon={faPen}/></Button>
                                    <Button className="mr-1" size="sm" variant="danger"><FontAwesomeIcon icon={faTrash}/></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
}

TodoTable.propTypes = {
    todos: PropTypes.array
};

export default TodoTable;
