import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal, Navbar } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import useUserFormValidation from '../../hooks/useUserFormValidation';
import UserFormInput from '../Input/UserFormInput';

function SignupModal () {
    const [modal, setModal] = useState(false);
    const { values, errors, touched, handleChange, handleSubmit, clearAll } = useUserFormValidation();

    const innerRef = useRef();
    useEffect(() => innerRef.current && innerRef.current.focus(), [modal]);

    const handleCancel = () => {
        clearAll();
        toggleModal();
    };

    const toggleModal = () => setModal(!modal);

    const inputTypes = ['email', 'nickname', 'password', 'confirmPassword'];
    const isFormValid = Object.keys(errors).length === 0 && Object.keys(touched).length === inputTypes.length;

    return (
        <>
            <Navbar.Text onClick={toggleModal} className="btn btn-link" as="span">
                <FormattedMessage id="navbar.signup"/>
            </Navbar.Text>
            <Modal size="md" show={modal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="signupModal.header"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {inputTypes.map((type, index) => (
                            <UserFormInput
                                type={type}
                                asterisk={true}
                                innerRef={innerRef}
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                key={index}
                            />
                        ))}
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
