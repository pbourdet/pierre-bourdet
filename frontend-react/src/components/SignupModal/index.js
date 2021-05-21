import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Form, Modal, Navbar, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import useUserFormValidation from '../../hooks/useUserFormValidation';
import UserFormInput from '../Input/UserFormInput';
import { signupSubmit, signinSubmit } from '../../requests/submitUserForm';
import { useAuthUpdate } from '../../contexts/AuthContext/index';
import { toast } from 'react-toastify';
import { useLocale } from '../../contexts/LocaleContext';

function SignupModal () {
    const [modal, setModal] = useState(false);
    const { values, errors, touched, handleChange, clearAll } = useUserFormValidation();
    const [loading, setLoading] = useState(false);
    const [inError, setInError] = useState(false);
    const updateAuth = useAuthUpdate();
    const locale = useLocale();

    const innerRef = useRef();
    useEffect(() => innerRef.current && innerRef.current.focus(), [modal]);

    const handleCancel = () => {
        setLoading(false);
        clearAll();
        toggleModal();
    };

    const inputTypes = ['email', 'nickname', 'password', 'confirmPassword'];
    const isFormValid = Object.keys(errors).length === 0 && Object.keys(touched).length === inputTypes.length;

    const toggleModal = () => setModal(!modal);

    const handleSignupSubmit = async () => {
        setLoading(true);
        const isCreated = await signupSubmit(values, locale);

        if (isCreated) {
            const { auth } = await signinSubmit(values);
            updateAuth(auth);
            toast.success(<FormattedMessage id='toast.user.signup' values={{ name: auth.user.nickname }}/>);
        } else {
            setInError(true);
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar.Text onClick={toggleModal} className="btn btn-link" as="span">
                <FormattedMessage id="navbar.signup"/>
            </Navbar.Text>
            <Modal size="md" show={modal} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="signupModal.header"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
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
                        {inError &&
                        <Alert variant="danger" onClose={() => setInError(false)} dismissible>
                            <p><FormattedMessage id="signupModal.error"/></p>
                        </Alert>
                        }
                        <div className="d-flex justify-content-around mt-4">
                            {loading
                                ? <Spinner animation="border" variant="primary"/>
                                : <Button className="mr-4 ml-4" disabled={!isFormValid} variant="primary" type="submit" onClick={handleSignupSubmit} block>
                                    <FormattedMessage id="signupModal.submitButton"/>
                                </Button>
                            }
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SignupModal;
