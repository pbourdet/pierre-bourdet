import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import useUserFormValidation from '../../hooks/useUserFormValidation';
import UserFormInput from '../Input/UserFormInput';
import { signinSubmit } from '../../helpers/submitUserForm';
import { useAuthUpdate } from '../../contexts/AuthContext';

function SigninModal () {
    const [modal, setModal] = useState(false);
    const { values, handleChange, clearAll } = useUserFormValidation();
    const [loading, setLoading] = useState(false);
    const [inError, setInError] = useState(false);
    const updateAuth = useAuthUpdate();

    const innerRef = useRef();
    useEffect(() => innerRef.current && innerRef.current.focus(), [modal]);

    const inputTypes = ['email', 'password'];
    const isFormFilled = values.password && values.email;

    const toggleModal = () => setModal(!modal);

    const handleCancel = () => {
        setInError(false);
        clearAll();
        toggleModal();
    };

    const handleSigninSubmit = async () => {
        setLoading(true);
        const { auth, isError } = await signinSubmit(values);

        if (isError) {
            setInError(true);
            setLoading(false);
        } else {
            updateAuth(auth);
        }
    };

    return (
        <>
            <Button onClick={toggleModal} variant="primary">
                <FontAwesomeIcon className="mr-2" icon={faUser}/><FormattedMessage id="navbar.signin"/>
            </Button>
            <Modal size="md" show={modal} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="signinModal.header"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {inputTypes.map((type, index) => (
                            <UserFormInput
                                type={type}
                                asterisk={false}
                                innerRef={innerRef}
                                values={values}
                                errors={{}}
                                touched={{}}
                                handleChange={handleChange}
                                key={index}
                            />
                        ))}
                    </Form>
                    {inError &&
                    <Alert variant="danger" onClose={() => setInError(false)} dismissible>
                        <p><FormattedMessage id="signinModal.authError"/></p>
                    </Alert>
                    }
                    <div className="d-flex justify-content-around mt-4">
                        {loading
                            ? <Spinner animation="border" variant="primary"/>
                            : <Button disabled={!isFormFilled} variant="primary" type="submit" onClick={handleSigninSubmit}><FormattedMessage id="signinModal.submitButton"/></Button>
                        }
                        <Button variant="danger" onClick={handleCancel}><FormattedMessage id="signinModal.cancelButton"/></Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SigninModal;
