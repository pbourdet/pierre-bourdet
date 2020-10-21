import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
import { useTodos } from '../../contexts/TodoContext';

function TodoTable () {
    const todos = useTodos();

    if (!Object.keys(todos).length) {
        return (
            <div><FormattedMessage id="todos.noTodos"/></div>
        );
    }

    return (
        <div className="m-lg-5">
            <Table bordered size="md">
                <thead>
                    <tr>
                        <th className="align-middle"><FormattedMessage id="todoTable.task"/></th>
                        <th className="align-middle d-none d-sm-table-cell"><FormattedMessage id="todoTable.description"/></th>
                        <th className="align-middle"><FormattedMessage id="todoTable.date"/></th>
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

export default TodoTable;
