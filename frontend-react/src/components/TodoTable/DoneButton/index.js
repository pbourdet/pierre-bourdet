import React, { useState } from 'react';
import { Button, Col, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import { useAuth, useAuthUpdate } from '../../../contexts/AuthContext';
import { editTodo } from '../../../requests/todos';

function DoneButton ({ todo, todos, setTodos }) {
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const updateAuth = useAuthUpdate();

    const handleEdit = async (todo) => {
        setLoading(true);
        todo.isDone = !todo.isDone;
        const newTodos = await editTodo(todo, todos, auth, updateAuth);
        setLoading(false);

        if (newTodos === todos) {
            toast.error(<FormattedMessage id='toast.error'/>);

            return;
        }

        setTodos(newTodos);

        todo.isDone
            ? toast.success(<FormattedMessage id='toast.todo.done' values={{ name: todo.name }}/>)
            : toast.info(<FormattedMessage id='toast.todo.undone' values={{ name: todo.name }}/>);
    };

    return (
        <Col className="d-flex justify-content-center align-items-center pr-1 pl-1" xs={1} sm={1}>
            <div className="ml-1">
                {loading
                    ? <Button className="rounded-circle" size="sm" variant="secondary">
                        <Spinner size="sm" animation="border" variant="primary"/>
                    </Button>
                    : <Button className="rounded-circle p-0" size="lg" variant="light" onClick={() => handleEdit(todo)}>
                        <FontAwesomeIcon icon={todo.isDone === true ? faCheckCircle : faCircle}/>
                    </Button>
                }
            </div>
        </Col>
    );
}

DoneButton.propTypes = {
    todo: PropTypes.object,
    todos: PropTypes.array,
    setTodos: PropTypes.func
};

export default DoneButton;
