import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import axios from '../../../config/axios';

function ContactMeModal () {
    const intl = useIntl();
    const [modal, setModal] = useState(false);
    const [inError, setInError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [touched, setTouched] = useState({});
    const toggleModal = () => setModal(!modal);

    const looseEmailRegex = /^.+@\S+\.\S+$/;

    const innerRef = useRef();
    useEffect(() => innerRef.current && innerRef.current.focus(), [modal]);

    const isFormValid = Object.keys(touched).length === 4 &&
        Object.keys(touched).every((key) => touched[key] === true) &&
        looseEmailRegex.test(values.email);

    const handleClose = () => {
        setLoading(false);
        setModal(!modal);
        setTouched({});
        setValues({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        setTouched({
            ...touched,
            [name]: value !== ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setInError(false);

        const isMailSent = await axios.post('/public/contact-me', JSON.stringify(values))
            .then(() => true)
            .catch(() => false);

        setLoading(false);

        if (!isMailSent) {
            setInError(true);

            return;
        }

        toast.success(<FormattedMessage id="toast.contact.success"/>);
        handleClose();
    };

    return (
        <>
            <Button size="lg" onClick={toggleModal} className="position-fixed mr-2 mr-md-4 mb-md-4 mb-2" style={{ right: 0, bottom: 0 }}>
                <FontAwesomeIcon className="mr-md-2" icon={faEnvelope}/>
                <span className="d-none d-md-inline">
                    <FormattedMessage id="resume.contact.button"/>
                </span>
            </Button>
            <Modal size="md" show={modal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="resume.contact.modal.header"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="email">
                                <FormattedMessage id="resume.contact.email.label"/>
                                <span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                ref={innerRef}
                                placeholder={intl.formatMessage({ id: 'resume.contact.email.placeholder' })}
                                onChange={handleChange}
                                isInvalid={touched.email && !looseEmailRegex.test(values.email)}
                                isValid={touched.email && looseEmailRegex.test(values.email)}
                                type="email" id="email" name="email" values={values.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                <FormattedMessage id="resume.contact.email.error"/>
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="name">
                                <FormattedMessage id="resume.contact.name.label"/>
                                <span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                placeholder={intl.formatMessage({ id: 'resume.contact.name.placeholder' })}
                                onChange={handleChange}
                                isValid={touched.name}
                                type="text" id="name" name="name" values={values.name}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="subject">
                                <FormattedMessage id="resume.contact.subject.label"/>
                                <span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                placeholder={intl.formatMessage({ id: 'resume.contact.subject.placeholder' })}
                                onChange={handleChange}
                                isValid={touched.subject}
                                type="text" id="subject" name="subject" values={values.subject}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="message">
                                <FormattedMessage id="resume.contact.message.label"/>
                                <span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                placeholder={intl.formatMessage({ id: 'resume.contact.message.placeholder' })}
                                onChange={handleChange}
                                isValid={touched.message}
                                as="textarea" id="message" name="message" values={values.message}
                            />
                        </Form.Group>
                        {inError &&
                        <Alert variant="danger" onClose={() => setInError(false)} dismissible>
                            <p><FormattedMessage id="resume.contact.error"/></p>
                        </Alert>
                        }
                        <div className="d-flex justify-content-around mt-4">
                            {loading
                                ? <Spinner animation="border" variant="primary"/>
                                : <Button className="mr-4 ml-4" disabled={!isFormValid} variant="primary" type="submit" block>
                                    <FormattedMessage id="resume.contact.submit"/>
                                </Button>
                            }
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ContactMeModal;
