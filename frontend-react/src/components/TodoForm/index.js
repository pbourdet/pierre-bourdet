import React, { useState } from 'react';
import { Form, Col, Button, Spinner } from 'react-bootstrap';
import useTodoForm from '../../hooks/useTodoForm';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useCreateTodo } from '../../contexts/TodoContext';
import { toast } from 'react-toastify';

function TodoForm ({ setOpen, todo }) {
    const { currentTodo, errors, handleChange, clearAll } = useTodoForm(todo);
    const intl = useIntl();
    const createTodo = useCreateTodo();
    const [loading, setLoading] = useState(false);

    const isFormValid = currentTodo.name !== '' && Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await createTodo(currentTodo);

        setLoading(false);
        setOpen(false);
        clearAll();

        toast.success(<FormattedMessage id='toast.todo.add' values={{ name: currentTodo.name }}/>);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group className="mt-1" as={Col} xs={6}>
                    <Form.Label><FormattedMessage id="todoForm.name.label"/><span className="ml-1 text-danger">*</span></Form.Label>
                    <Form.Control
                        isInvalid={errors.name} onChange={handleChange} value={currentTodo.name}
                        id="name" name="name" type="text" placeholder={intl.formatMessage({ id: 'todoForm.name.placeholder' })}/>
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-1" as={Col} xs={6}>
                    <Form.Label><FormattedMessage id="todoForm.description.label"/></Form.Label>
                    <Form.Control
                        isInvalid={errors.description} onChange={handleChange} value={currentTodo.description}
                        id="description" name="description" placeholder={intl.formatMessage({ id: 'todoForm.description.placeholder' })}/>
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-1" as={Col} xs={7}>
                    <Form.Label><FormattedMessage id="todoForm.date.label"/></Form.Label>
                    <Form.Control
                        type="date" id="date" name="date" isInvalid={errors.date}
                        value={currentTodo.date} onChange={handleChange}
                        min={intl.formatDate(Date.now()).split('/').reverse().join('-')}
                    />
                    <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-1" as={Col} xs={5}>
                    <Form.Label><FormattedMessage id="todoForm.time.label"/></Form.Label>
                    <Form.Control isInvalid={errors.time} onChange={handleChange} value={currentTodo.time} type="time" id="time" name="time"/>
                    <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
                </Form.Group>
                <Col>
                    <div className="d-table w-100 h-100">
                        <div className="m-2 d-table-cell align-middle">
                            {loading
                                ? <Spinner className="mb-2" animation="border" variant="primary"/>
                                : <Button disabled={!isFormValid} className="mb-2" type="submit">
                                    <FontAwesomeIcon className="mr-2" icon={faCheck}/>
                                    <FormattedMessage id="todoForm.addTodo"/>
                                </Button>
                            }
                        </div>
                    </div>
                </Col>
            </Form.Row>
        </Form>
    );
}

TodoForm.propTypes = {
    todo: PropTypes.object,
    setOpen: PropTypes.func
};

export default TodoForm;
