import React, { useState } from 'react';
import { Form, Col, Button, Spinner } from 'react-bootstrap';
import useTodoForm from '../../hooks/useTodoForm';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useCreateTodo, useEditTodo } from '../../contexts/TodoContext';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

function TodoForm ({ setOpen, setTodoEdited, todo, isFirstTodo, isEdit }) {
    const { currentTodo, errors, handleChange, clearAll } = useTodoForm(todo);
    const intl = useIntl();
    const createTodo = useCreateTodo();
    const editTodo = useEditTodo();
    const [loading, setLoading] = useState(false);
    const isTouched = currentTodo !== todo;
    const isFormValid = isTouched && currentTodo.name !== '' && Object.keys(errors).length === 0;

    const initialDate = currentTodo.date ? format(currentTodo.date, "yyyy-MM-dd'T'HH:mm") : '';
    const initialReminder = currentTodo.reminder ? format(currentTodo.reminder, "yyyy-MM-dd'T'HH:mm") : '';
    const minDate = currentTodo.date
        ? format(Math.min(currentTodo.date, new Date().getTime()), "yyyy-MM-dd'T'HH:mm")
        : format(new Date().getTime(), "yyyy-MM-dd'T'HH:mm");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (isEdit) {
            await editTodo(currentTodo);
            setLoading(false);
            setTodoEdited(0);
            clearAll();
            toast.success(<FormattedMessage id='toast.todo.edit' values={{ name: currentTodo.name }}/>);

            return;
        }

        await createTodo(currentTodo);

        if (!isFirstTodo) {
            setLoading(false);
            setOpen(false);
            clearAll();
            toast.success(<FormattedMessage id='toast.todo.add' values={{ name: currentTodo.name }}/>);
        }
    };

    return (
        <Form className="mt-2" onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group className="mt-1" as={Col} md={6} >
                    <Form.Label><FormattedMessage id="todoForm.name.label"/><span className="ml-1 text-danger">*</span></Form.Label>
                    <Form.Control
                        isInvalid={errors.name} onChange={handleChange} value={currentTodo.name}
                        id="name" name="name" type="text" placeholder={intl.formatMessage({ id: 'todoForm.name.placeholder' })}/>
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-1" as={Col} md={6}>
                    <Form.Label><FormattedMessage id="todoForm.description.label"/></Form.Label>
                    <Form.Control
                        isInvalid={errors.description} onChange={handleChange} value={currentTodo.description}
                        id="description" name="description" placeholder={intl.formatMessage({ id: 'todoForm.description.placeholder' })}/>
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-1" as={Col} sm={6}>
                    <Form.Label><FormattedMessage id="todoForm.date.label"/></Form.Label>
                    <Form.Control
                        type="datetime-local" id="date" name="date" isInvalid={errors.date}
                        value={initialDate} onChange={handleChange}
                        min={minDate}
                    />
                    <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-1" as={Col} sm={6}>
                    <Form.Label><FormattedMessage id="todoForm.reminder.label"/></Form.Label>
                    <Form.Control
                        type="datetime-local" id="reminder" name="reminder" isInvalid={errors.reminder}
                        value={initialReminder} onChange={handleChange}
                        min={format(new Date().getTime(), "yyyy-MM-dd'T'HH:mm")}
                        max={currentTodo.date && format(currentTodo.date, "yyyy-MM-dd'T'HH:mm")}
                    />
                    <Form.Control.Feedback type="invalid">{errors.reminder}</Form.Control.Feedback>
                </Form.Group>
                <Col className="mb-2">
                    {loading
                        ? <Spinner animation="border" variant="primary"/>
                        : <Button disabled={!isFormValid} type="submit">
                            <FontAwesomeIcon className="mr-2" icon={faCheck}/>
                            {isEdit
                                ? <FormattedMessage id="todoForm.editTodo"/>
                                : <FormattedMessage id="todoForm.addTodo"/>
                            }
                        </Button>
                    }
                </Col>
            </Form.Row>
        </Form>
    );
}

TodoForm.propTypes = {
    todo: PropTypes.object,
    setOpen: PropTypes.func,
    setTodoEdited: PropTypes.func,
    isFirstTodo: PropTypes.bool,
    isEdit: PropTypes.bool
};

export default TodoForm;
