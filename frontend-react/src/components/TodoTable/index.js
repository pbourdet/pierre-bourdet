import React, { useEffect, useRef, useState } from 'react';
import { Button, Collapse, Row, Col, OverlayTrigger, Popover, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
import { useDeleteTodo, useTodos } from '../../contexts/TodoContext';
import TodoForm from '../TodoForm';
import { toast } from 'react-toastify';

function TodoTable () {
    const todos = useTodos();
    const [open, setOpen] = useState(false);
    const [todoDeleted, setTodoDeleted] = useState(0);
    const [todoEdited, setTodoEdited] = useState(0);
    const deleteTodo = useDeleteTodo();

    const innerRef = useRef();
    useEffect(() => innerRef.current && innerRef.current.focus(), [open]);

    const handleDelete = async (todo) => {
        setTodoDeleted(todo.id);
        await deleteTodo(todo);

        toast.success(<FormattedMessage id='toast.todo.delete' values={{ name: todo.name }}/>);
    };

    if (!Object.keys(todos).length) {
        return (
            <>
                <div className="mb-2"><FormattedMessage id="todos.noTodos"/></div>
                <TodoForm setOpen={setOpen} todo={{}} isFirstTodo={true} isEdit={false}/>
            </>
        );
    }

    return (
        <>
            <div style={{ fontSize: '90%' }} className="m-3">
                <Row>
                    <Col xs={5} sm={2} className="p-3 border">
                        <div className="d-table w-100 h-100">
                            <div className="d-table-cell align-middle h6">
                                <FormattedMessage id="todoTable.task"/>
                            </div>
                        </div>
                    </Col>
                    <Col sm={5} className="p-3 border d-none d-sm-block">
                        <div className="d-table w-100 h-100">
                            <div className="d-table-cell align-middle h6">
                                <FormattedMessage id="todoTable.description"/>
                            </div>
                        </div>
                    </Col>
                    <Col xs={4} sm={3} className="d-flex p-3 border">
                        <div className="d-table w-100 h-100">
                            <div className="d-table-cell align-middle h6">
                                <FormattedMessage id="todoTable.date"/>
                            </div>
                        </div>
                    </Col>
                    <Col xs={3} sm={2} className="border-left border-bottom p-3">
                        {open
                            ? <Button variant="danger" onClick={() => setOpen(!open)} aria-controls="create-todo-form" aria-expanded={open}>
                                <FontAwesomeIcon className="mr-1" icon={faTimes}/>
                                <span className="d-none d-md-inline"><FormattedMessage id="todoTable.cancel"/></span>
                            </Button>
                            : <Button onClick={() => setOpen(!open)} aria-controls="create-todo-form" aria-expanded={open}>
                                <FontAwesomeIcon className="mr-md-1" icon={faPlus}/>
                                <span className="d-none d-md-inline"><FormattedMessage id="todoTable.add"/></span>
                            </Button>
                        }
                    </Col>
                </Row>
                <Collapse in={open}>
                    <div id="create-todo-form">
                        <TodoForm setOpen={setOpen} todo={{}} isFirstTodo={false} isEdit={false}/>
                    </div>
                </Collapse>
                {todos.map((todo, index) => (
                    <div key={index}>
                        <Row>
                            <Col xs={5} sm={2} className="p-2 border">
                                <div className="d-table w-100 h-100">
                                    <div className="d-table-cell align-middle text-break">
                                        {todo.name}
                                    </div>
                                </div>
                            </Col>
                            <Col sm={5} className="p-2 border d-none d-sm-block">
                                <div className="d-table w-100 h-100">
                                    <div className="d-table-cell align-middle text-break">
                                        {todo.description}
                                    </div>
                                </div>
                            </Col>
                            <Col xs={4} sm={3} className="p-2 border">
                                <div className="d-table w-100 h-100">
                                    <div className="d-table-cell align-middle">
                                        <div>{todo.date && <FormattedDate value={todo.date}/>}</div>
                                        <div>{todo.date && <FormattedTime value={todo.date}/>}</div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={3} sm={2} className="p-2 border">
                                <div className="d-table w-100 h-100">
                                    <div className="d-table-cell align-middle">
                                        <div>
                                            <Button className="mr-1 mt-1" size="sm" variant="success"><FontAwesomeIcon icon={faCheck}/></Button>
                                            {todoEdited === todo.id
                                                ? <Button onClick={() => setTodoEdited(0)} className="mr-1 mt-1" size="sm"><FontAwesomeIcon icon={faTimes}/></Button>
                                                : <Button onClick={() => setTodoEdited(todo.id)} className="mr-1 mt-1" size="sm"><FontAwesomeIcon icon={faPen}/></Button>
                                            }
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
                                                    ? <Button className="mt-1" disabled size="sm" variant="secondary">
                                                        <Spinner size="sm" animation="border" variant="primary"/>
                                                    </Button>
                                                    : <Button className="mr-1 mt-1" size="sm" variant="danger"><FontAwesomeIcon icon={faTrash}/></Button>
                                                }
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Collapse in={todo.id === todoEdited} mountOnEnter={true} unmountOnExit={true}>
                            <div id="create-todo-form">
                                <TodoForm setOpen={setOpen} setTodoEdited={setTodoEdited} todo={todo} isFirstTodo={false} isEdit={true}/>
                            </div>
                        </Collapse>
                    </div>
                ))}
            </div>
        </>
    );
}

export default TodoTable;
