import React, { useState } from 'react';
import { Button, Col, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useEditTodo } from '../../../contexts/TodoContext';
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

function DoneButton ({ todo }) {
    const [loading, setLoading] = useState(false);
    const editTodo = useEditTodo();

    const handleEdit = async (todo) => {
        setLoading(true);
        todo.isDone = !todo.isDone;
        await editTodo(todo);

        todo.isDone
            ? toast.success(<FormattedMessage id='toast.todo.done' values={{ name: todo.name }}/>)
            : toast.info(<FormattedMessage id='toast.todo.undone' values={{ name: todo.name }}/>);
        setLoading(false);
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
    todo: PropTypes.object
};

export default DoneButton;
