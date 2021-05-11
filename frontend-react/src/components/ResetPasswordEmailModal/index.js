import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import useUserFormValidation from '../../hooks/useUserFormValidation';
import UserFormInput from '../Input/UserFormInput';
import { toast } from 'react-toastify';
import { resetPasswordEmail } from '../../requests/resetPassword';
import { useLocale } from '../../contexts/LocaleContext';

function ResetPasswordEmailModal () {
    const [modal, setModal] = useState(false);
    const { values, errors, touched, handleChange, clearAll } = useUserFormValidation();
    const [loading, setLoading] = useState(false);
    const [inError, setInError] = useState(false);
    const isFormValid = values.email !== '' && Object.keys(errors).length === 0;
    const locale = useLocale();

    const innerRef = useRef();
    useEffect(() => innerRef.current && innerRef.current.focus(), [modal]);

    const toggleModal = () => setModal(!modal);

    const handleCancel = () => {
        clearAll();
        toggleModal();
    };

    const handleSubmit = async () => {
        setLoading(true);
        setInError(false);

        const isMailSent = await resetPasswordEmail(values.email, locale);
        setLoading(false);

        if (!isMailSent) {
            setInError(true);

            return;
        }

        toggleModal();
        toast.info(<FormattedMessage id='toast.reset.email' values={{ email: values.email }}/>);
    };

    return (
        <>
            <Button onClick={toggleModal} variant="link"><FormattedMessage id="reset.modal.open"/></Button>
            <Modal size="md" show={modal} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="reset.modal.header"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-justify mb-3">
                        <FormattedMessage id="reset.modal.body"/>
                    </div>
                    <Form>
                        <UserFormInput
                            type="email"
                            asterisk={false}
                            innerRef={innerRef}
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange}
                        />
                    </Form>
                    {inError &&
                    <Alert variant="danger" onClose={() => setInError(false)} dismissible>
                        <p><FormattedMessage id="reset.modal.error"/></p>
                    </Alert>
                    }
                    <div className="d-flex justify-content-around mt-4 mb-2">
                        {loading
                            ? <Spinner animation="border" variant="primary"/>
                            : <Button className="" disabled={!isFormValid} variant="primary" onClick={handleSubmit} block>
                                <FormattedMessage id="reset.modal.submit"/>
                            </Button>
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ResetPasswordEmailModal;
