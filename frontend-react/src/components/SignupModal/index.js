import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Modal, Navbar} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";

function SignupModal() {
    const [modal, setModal] = useState(false);
    const intl = useIntl();

    const innerRef = useRef();
    useEffect(() => innerRef.current && innerRef.current.focus(), [modal]);

    const toggle = () => setModal(!modal);
    return (
        <>
            <Navbar.Text onClick={toggle} className="btn btn-link" as="span">
                <FormattedMessage id="navbar.signup"/>
            </Navbar.Text>
            <Modal size="md" show={modal} onHide={toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="signupModal.header"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="email"><FormattedMessage id="userForm.email.label"/></Form.Label>
                            <Form.Control ref={innerRef} type="email" name="email" id="email" placeholder={intl.formatMessage({ id: 'userForm.email.placeholder' })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="nickname"><FormattedMessage id="userForm.nickname.label"/></Form.Label>
                            <Form.Control type="text" name="nickname" id="nickname" placeholder={intl.formatMessage({ id: 'userForm.nickname.placeholder' })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password"><FormattedMessage id="userForm.password.label"/></Form.Label>
                            <Form.Control type="password" name="password" id="password" placeholder={intl.formatMessage({ id: 'userForm.password.placeholder' })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="confirmPassword"><FormattedMessage id="userForm.confirmPassword.label"/></Form.Label>
                            <Form.Control type="password" name="confirmPassword" id="confirmPassword" placeholder={intl.formatMessage({ id: 'userForm.confirmPassword.placeholder' })} />
                        </Form.Group>
                    </Form>
                    <div className="d-flex justify-content-around mt-4">
                        <Button variant="success" type="submit" onClick={toggle}><FormattedMessage id="signupModal.submitButton"/></Button>
                        <Button variant="warning" onClick={toggle}><FormattedMessage id="signupModal.cancelButton"/></Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SignupModal;