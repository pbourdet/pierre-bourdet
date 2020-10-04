import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import useUserForm from '../../hooks/useUserForm';

function SigninModal () {
    const [modal, setModal] = useState(false);
    const intl = useIntl();
    const { values, handleChange } = useUserForm();

    const innerRef = useRef();
    useEffect(() => innerRef.current && innerRef.current.focus(), [modal]);

    const toggleModal = () => setModal(!modal);

    const isFormFilled = values.password && values.email;

    return (
        <>
            <Button onClick={toggleModal} variant="primary">
                <FontAwesomeIcon className="mr-2" icon={faUser}/><FormattedMessage id="navbar.signin"/>
            </Button>
            <Modal size="md" show={modal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="signinModal.header"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="email"><FormattedMessage id="userForm.email.label"/></Form.Label>
                            <Form.Control onChange={handleChange} ref={innerRef} type="email" name="email" id="email" placeholder={intl.formatMessage({ id: 'userForm.email.placeholder' })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password"><FormattedMessage id="userForm.password.label"/></Form.Label>
                            <Form.Control onChange={handleChange} type="password" name="password" id="password" placeholder={intl.formatMessage({ id: 'userForm.password.placeholder' })} />
                        </Form.Group>
                    </Form>
                    <div className="d-flex justify-content-around mt-4">
                        <Button disabled={!isFormFilled} variant="success" type="submit" onClick={toggleModal}><FormattedMessage id="signinModal.submitButton"/></Button>
                        <Button variant="warning" onClick={toggleModal}><FormattedMessage id="signinModal.cancelButton"/></Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SigninModal;
