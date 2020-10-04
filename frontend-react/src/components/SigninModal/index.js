import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import useUserForm from '../../hooks/useUserForm';
import UserFormInput from '../Input/UserFormInput';

function SigninModal () {
    const [modal, setModal] = useState(false);
    const { values, handleChange } = useUserForm();

    const innerRef = useRef();
    useEffect(() => innerRef.current && innerRef.current.focus(), [modal]);

    const toggleModal = () => setModal(!modal);

    const inputTypes = ['email', 'password'];
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
