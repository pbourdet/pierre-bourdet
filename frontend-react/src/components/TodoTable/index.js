import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
import CreateTodoModal from '../CreateTodoModal';

function TodoTable ({ todos }) {
    if (!Object.keys(todos).length) {
        return (
            <div>Ajoutez des todos ! <CreateTodoModal/></div>
        );
    }

    return (
        <div className="m-lg-5">
            <Table bordered size="md">
                <thead>
                    <tr>
                        <th className="align-middle"><FormattedMessage id="todoTable.task"/></th>
                        <th className="align-middle d-none d-sm-table-cell">Description</th>
                        <th className="align-middle"><FormattedMessage id="todoTable.date"/></th>
                        <th><CreateTodoModal todo={{}}/></th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={index}>
                            <td className="align-middle">{todo.name}</td>
                            <td className="align-middle d-none d-sm-table-cell"><div>{todo.description}</div></td>
                            <td className="w-25- align-middle">
                                <div>{todo.date && <FormattedDate value={todo.date}/>}</div>
                                <div>{todo.date && <FormattedTime value={todo.date}/>}</div>
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
        </div>
    );
}

TodoTable.propTypes = {
    todos: PropTypes.array
};

export default TodoTable;
