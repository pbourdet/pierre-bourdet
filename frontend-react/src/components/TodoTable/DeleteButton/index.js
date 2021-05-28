import React, { useState } from 'react';
import { Button, OverlayTrigger, Popover, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useDeleteTodo } from '../../../contexts/TodoContext';
import PropTypes from 'prop-types';

function DeleteButton ({ todo }) {
    const [todoDeleted, setTodoDeleted] = useState(0);
    const deleteTodo = useDeleteTodo();

    const handleDelete = async (todo) => {
        setTodoDeleted(todo.id);
        await deleteTodo(todo);

        toast.success(<FormattedMessage id='toast.todo.delete' values={{ name: todo.name }}/>);
    };

    return (
        <OverlayTrigger
            trigger="focus"
            placement="left"
            overlay={
                <Popover>
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
    todo: PropTypes.object
};

export default DeleteButton;
