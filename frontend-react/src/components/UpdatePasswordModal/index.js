import React, { useState } from 'react';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import useUserFormValidation from '../../hooks/useUserFormValidation';
import UserFormInput from '../Input/UserFormInput';
import { FormattedMessage } from 'react-intl';
import { updatePasswordSubmit } from '../../requests/user';
import { useAuth, useAuthUpdate } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

function UpdatePasswordModal () {
    const auth = useAuth();
    const updateAuth = useAuthUpdate();
    const [modal, setModal] = useState(false);
    const inputTypes = ['currentPassword', 'newPassword', 'confirmPassword'];
    const { values, handleChange, errors, touched, clearAll } = useUserFormValidation();
    const [loading, setLoading] = useState(false);
    const [inError, setInError] = useState(false);
    const isFormValid = Object.keys(errors).length === 0 && Object.keys(touched).length === inputTypes.length;

    const toggleModal = () => setModal(!modal);

    const handleCancel = () => {
        setLoading(false);
        clearAll();
        toggleModal();
    };

    const handleSubmit = async () => {
        setLoading(true);
        const isUpdated = await updatePasswordSubmit(values, auth, updateAuth);

        if (isUpdated) {
            setInError(false);
            handleCancel();
            toast.success(<FormattedMessage id='toast.user.updatePassword'/>);
        } else {
            setInError(true);
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={toggleModal}><FormattedMessage id="updatePassword.title"/></Button>
            <Modal size="md" show={modal} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="updatePassword.title"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {inputTypes.map((type, index) => (
                            <UserFormInput
                                type={type}
                                asterisk={true}
                                innerRef={{}}
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                key={index}
                            />
                        ))}
                        {inError &&
                        <Alert variant="danger" onClose={() => setInError(false)} dismissible>
                            <p><FormattedMessage id="updatePassword.error"/></p>
                        </Alert>
                        }
                        <div className="d-flex justify-content-around mt-4">
                            {loading
                                ? <Spinner animation="border" variant="primary"/>
                                : <Button className="mr-4 ml-4" disabled={!isFormValid} onClick={handleSubmit} variant="primary" type="submit" block>
                                    <FormattedMessage id="updatePassword.submitButton"/>
                                </Button>
                            }
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UpdatePasswordModal;
