import React, { useState } from 'react';
import { Button, Collapse, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import TodoForm from '../TodoForm';
import DeleteButton from './DeleteButton';
import DoneButton from './DoneButton';
import TodoDetails from './TodoDetails';
import PropTypes from 'prop-types';

function TodoTable ({ todos, setTodos }) {
    const [open, setOpen] = useState(false);
    const [todoEdited, setTodoEdited] = useState(0);

    if (!Object.keys(todos).length) {
        return (
            <div className="p-4">
                <div className="mb-2"><FormattedMessage id="todos.noTodos"/></div>
                <TodoForm setOpen={setOpen} todo={{}} isFirstTodo={true} isEdit={false}/>
            </div>
        );
    }

    return (
        <>
            <Row className="justify-content-end p-2">
                <Button variant={open ? 'danger' : 'primary'} onClick={() => setOpen(!open)} aria-controls="create-todo-form" aria-expanded={open}>
                    <FontAwesomeIcon className="mr-2" icon={open ? faTimes : faPlus}/>
                    <FormattedMessage id={open ? 'todoTable.cancel' : 'todoTable.add'}/>
                </Button>
            </Row>
            <Collapse in={open}>
                <div id="create-todo-form">
                    <TodoForm setOpen={setOpen} todo={{}} isFirstTodo={false} isEdit={false}/>
                </div>
            </Collapse>
            <div className="border-top">
                {todos.map((todo, index) => (
                    <div className="pt-2 pb-2 border-bottom" key={index}>
                        <Row >
                            <DoneButton todo={todo}/>
                            <TodoDetails todo={todo}/>
                            <Col className="d-flex justify-content-center align-items-center pl-0 pr-1" xs={3} sm={2}>
                                <div className="mr-1">
                                    <Button onClick={() => setTodoEdited(todoEdited === todo.id ? 0 : todo.id)} className="rounded-circle mr-2" size="sm">
                                        <FontAwesomeIcon icon={todoEdited === todo.id ? faTimes : faPen}/>
                                    </Button>
                                    <DeleteButton todo={todo}/>
                                </div>
                            </Col>
                        </Row>
                        <Collapse in={todo.id === todoEdited} mountOnEnter={true} unmountOnExit={true}>
                            <div id="edit-todo-form">
                                <TodoForm setOpen={setOpen} setTodoEdited={setTodoEdited} todo={todo} isFirstTodo={false} isEdit={true}/>
                            </div>
                        </Collapse>
                    </div>
                ))}
            </div>
        </>
    );
}

TodoTable.propTypes = {
    setTodos: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            date: PropTypes.number,
            name: PropTypes.string,
            description: PropTypes.string,
            reminder: PropTypes.number
        })
    ).isRequired
};

export default TodoTable;
