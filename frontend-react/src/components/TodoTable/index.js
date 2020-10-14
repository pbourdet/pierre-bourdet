import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

function TodoTable ({ todos }) {
    if (!Object.keys(todos).length) {
        return (
            <div>Ajoutez des todos !</div>
        );
    }
    return (
        <Table bordered size="md">
            <thead>
                <tr>
                    <th><FormattedMessage id="todoTable.task"/></th>
                    <th className="d-none d-md-block">Description</th>
                    <th><FormattedMessage id="todoTable.date"/></th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo, index) => (
                    <tr key={index}>
                        <td className="align-middle">{todo.name}</td>
                        <td className="pt-4 pb-4 align-middle d-none d-md-block"><div>{todo.description}</div></td>
                        <td className="border-left align-middle">
                            <div>{todo.date.slice(0, 10).split('-').reverse().join('/')}</div>
                            <div>{todo.date.slice(11, 16).split('-').reverse().join('/')}</div>
                        </td>
                        <td className="border-top border-left align-middle">
                            <Button className="mr-1" size="sm" variant="success"><FontAwesomeIcon icon={faCheck}/></Button>
                            <Button className="mr-1" size="sm"><FontAwesomeIcon icon={faPen}/></Button>
                            <Button className="mr-1" size="sm" variant="danger"><FontAwesomeIcon icon={faTrash}/></Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

TodoTable.propTypes = {
    todos: PropTypes.array
};

export default TodoTable;
