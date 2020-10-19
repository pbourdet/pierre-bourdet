import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage, useIntl} from 'react-intl';
import useTodoForm from '../../hooks/useTodoForm';
import {useAuth} from "../../contexts/AuthContext";
import {createTodo} from "../../requests/createTodo";

function CreateTodoModal () {
    const [modal, setModal] = useState(false);
    const {currentTodo, errors, handleChange } = useTodoForm();
    const intl = useIntl();
    const auth = useAuth();

    const innerRef = useRef();
    useEffect(() => innerRef.current && innerRef.current.focus(), [modal]);

    const toggleModal = () => setModal(!modal);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTodo(currentTodo, auth);
    };

    return (
        <>
            <Button onClick={toggleModal}>
                <FontAwesomeIcon className="mr-1" icon={faPlus}/>
                <span className="d-none d-sm-inline"><FormattedMessage id="todoTable.add"/></span>
            </Button>
            <Modal size="md" show={modal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="todoModal.header"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label><FormattedMessage id="todoModal.task"/><span className="ml-1 text-danger">*</span></Form.Label>
                            <Form.Control onChange={handleChange} value={currentTodo.name} id="name" name="name" ref={innerRef} type="text"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><FormattedMessage id="todoModal.description"/></Form.Label>
                            <Form.Control onChange={handleChange} value={currentTodo.description} id="description" name="description" as="textarea"/>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date" id="date" name="date"
                                    value={currentTodo.date} onChange={handleChange}
                                    min={intl.formatDate(Date.now()).split('/').reverse().join('-')}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label><FormattedMessage id="todoModal.time"/></Form.Label>
                                <Form.Control onChange={handleChange} value={currentTodo.time} type="time" id="time" name="time"/>
                            </Form.Group>
                        </Form.Row>
                        <div className="d-flex justify-content-around mt-4">
                            <Button variant="success" type="submit"><FontAwesomeIcon className="mr-2" icon={faCheck}/>Add</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateTodoModal;
