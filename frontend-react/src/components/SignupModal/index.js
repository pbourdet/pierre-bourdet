import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal, Navbar } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import useSignupForm from '../../hooks/useSignupForm';
import validateSignup from '../../helpers/validateSignup';

function SignupModal () {
    const [modal, setModal] = useState(false);
    const intl = useIntl();
    const { values, errors, touched, handleChange, handleBlur, handleSubmit, clearAll } = useSignupForm(validateSignup);

    const innerRef = useRef();
    useEffect(() => innerRef.current && innerRef.current.focus(), [modal]);

    const handleCancel = () => {
        clearAll();
        toggle();
    };

    const isFormValid = Object.keys(errors).length === 0 && Object.keys(touched).length === 4;

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
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="email"><FormattedMessage id="userForm.email.label"/></Form.Label>
                            <Form.Control
                                ref={innerRef}
                                onBlur={handleBlur} onChange={handleChange}
                                isInvalid={touched.email && errors.email} isValid={touched.email && !errors.email}
                                values={values.email} type="email" name="email" id="email" placeholder={intl.formatMessage({ id: 'userForm.email.placeholder' })} />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="nickname"><FormattedMessage id="userForm.nickname.label"/></Form.Label>
                            <Form.Control onBlur={handleBlur} onChange={handleChange} isInvalid={touched.nickname && errors.nickname} isValid={touched.nickname && !errors.nickname} values={values.nickname} type="text" name="nickname" id="nickname" placeholder={intl.formatMessage({ id: 'userForm.nickname.placeholder' })} />
                            <Form.Control.Feedback type="invalid">{errors.nickname}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password"><FormattedMessage id="userForm.password.label"/></Form.Label>
                            <Form.Control
                                onBlur={handleBlur} onChange={handleChange}
                                isInvalid={touched.password && errors.password} isValid={touched.password && !errors.password}
                                values={values.password} type="password" name="password" id="password" placeholder={intl.formatMessage({ id: 'userForm.password.placeholder' })} />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="confirmPassword"><FormattedMessage id="userForm.confirmPassword.label"/></Form.Label>
                            <Form.Control
                                onBlur={handleBlur} onChange={handleChange}
                                isInvalid={touched.confirmPassword && errors.confirmPassword} isValid={touched.confirmPassword && !errors.confirmPassword}
                                values={values.confirmPassword} type="password" name="confirmPassword" id="confirmPassword" placeholder={intl.formatMessage({ id: 'userForm.confirmPassword.placeholder' })} />
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>
                        <div className="d-flex justify-content-around mt-4">
                            <Button disabled={!isFormValid} variant="success" type="submit"><FormattedMessage id="signupModal.submitButton"/></Button>
                            <Button variant="warning" onClick={handleCancel}><FormattedMessage id="signupModal.cancelButton"/></Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SignupModal;
