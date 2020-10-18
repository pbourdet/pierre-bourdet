import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';

function CreateTodoModal () {
    const [modal, setModal] = useState(false);

    const innerRef = useRef();
    useEffect(() => innerRef.current && innerRef.current.focus(), [modal]);

    const toggleModal = () => setModal(!modal);

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
                    <Form onChange={() => {}}>
                        <Form.Group>
                            <Form.Label><FormattedMessage id="todoModal.task"/><span className="ml-1 text-danger">*</span></Form.Label>
                            <Form.Control ref={innerRef} type="text"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><FormattedMessage id="todoModal.description"/></Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Date</Form.Label>
                                <DatePicker
                                    minDate={new Date()}
                                    className="form-control"
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label><FormattedMessage id="todoModal.time"/></Form.Label>
                                <Form.Control type="time"/>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                    <div className="d-flex justify-content-around mt-4">
                        <Button variant="success"><FontAwesomeIcon className="mr-2" icon={faCheck}/>Add</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateTodoModal;
