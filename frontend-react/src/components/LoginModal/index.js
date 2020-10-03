import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';

function LoginModal () {
    const [modal, setModal] = useState(false);
    const intl = useIntl();

    const innerRef = useRef();
    useEffect(() => innerRef.current && innerRef.current.focus(), [modal]);

    const toggle = () => setModal(!modal);

    return (
        <>
            <Button onClick={toggle} variant="primary">
                <FontAwesomeIcon className="mr-2" icon={faUser}/><FormattedMessage id="navbar.signin"/>
            </Button>
            <Modal size="md" show={modal} onHide={toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="login.header"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="exampleEmail"><FormattedMessage id="login.labelEmail"/></Form.Label>
                            <Form.Control ref={innerRef} type="email" name="email" id="exampleEmail" placeholder={intl.formatMessage({ id: 'login.placeholderEmail' })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="examplePassword"><FormattedMessage id="login.labelPassword"/></Form.Label>
                            <Form.Control type="password" name="password" id="examplePassword" placeholder={intl.formatMessage({ id: 'login.placeholderPassword' })} />
                        </Form.Group>
                    </Form>
                    <div className="d-flex justify-content-around mt-4">
                        <Button variant="success" type="submit" onClick={toggle}><FormattedMessage id="login.signinButton"/></Button>
                        <Button variant="warning" onClick={toggle}><FormattedMessage id="login.cancelButton"/></Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LoginModal;
