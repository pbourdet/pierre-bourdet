import React, { useState } from 'react';
import { Button, OverlayTrigger, Popover, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { deleteTodos } from '../../../requests/todos';
import { useAuth, useAuthUpdate } from '../../../contexts/AuthContext';

function DeleteButton ({ todo, todos, setTodos }) {
    const [todoDeleted, setTodoDeleted] = useState(0);
    const auth = useAuth();
    const updateAuth = useAuthUpdate();

    const handleDelete = async (todo) => {
        setTodoDeleted(todo.id);
        const newTodos = await deleteTodos(todo, todos, auth, updateAuth);
        setTodoDeleted(0);

        if (newTodos === todos) {
            toast.error(<FormattedMessage id='toast.error'/>);

            return;
        }

        setTodos(newTodos);
        toast.success(<FormattedMessage id='toast.todo.delete' values={{ name: todo.name }}/>);
    };

    return (
        <OverlayTrigger
            trigger="focus"
            placement="left"
            overlay={
                <Popover id="delete-todo-confirmation">
                    <Popover.Title as="h5"><FormattedMessage id="todoTable.confirmDelete.title"/></Popover.Title>
                    <Popover.Content>
                        <Button block variant="danger" onClick={() => handleDelete(todo)}>
                            <FormattedMessage id="todoTable.confirmDelete.button"/>
                        </Button>
                    </Popover.Content>
                </Popover>
            }
        >
            {todoDeleted === todo.id
                ? <Button className="rounded-circle" size="sm" variant="secondary">
                    <Spinner size="sm" animation="border" variant="primary"/>
                </Button>
                : <Button className="rounded-circle" size="sm" variant="danger"><FontAwesomeIcon icon={faTrash}/></Button>
            }
        </OverlayTrigger>
    );
}

DeleteButton.propTypes = {
    todos: PropTypes.array,
    setTodos: PropTypes.func,
    todo: PropTypes.object
};

export default DeleteButton;
