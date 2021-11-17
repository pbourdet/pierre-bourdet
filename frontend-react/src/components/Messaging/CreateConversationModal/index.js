import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { useAuth, useAuthUpdate } from '../../../contexts/AuthContext';
import { createConversation } from '../../../requests/messaging';
import PropTypes from 'prop-types';

function CreateConversationModal ({ conversations, setConversations, setActiveKey }) {
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inError, setInError] = useState(false);
    const updateAuth = useAuthUpdate();
    const auth = useAuth();

    const inputRef = useRef();
    useEffect(() => inputRef.current && inputRef.current.focus(), [modal]);

    const toggleModal = () => setModal(!modal);

    const handleCancel = () => {
        setInError(false);
        toggleModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = inputRef.current.value;

        if (userId === '') return;

        inputRef.current.value = '';
        setLoading(true);
        const conversation = await createConversation(userId, auth, updateAuth);
        setLoading(false);

        if (conversation === null) {
            setInError(true);

            return;
        }

        toggleModal();
        setConversations([conversation, ...conversations]);
        setActiveKey(conversation.id);
        toast.success(<FormattedMessage id="messaging.create.conversation.success"/>);
    };

    return (
        <div>
            <Button className="mb-2" onClick={toggleModal} variant="success">
                <FontAwesomeIcon className="mr-2" icon={faPlus}/><FormattedMessage id="messaging.create.conversation.title"/>
            </Button>
            <Modal size="md" show={modal} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="messaging.create.conversation.title"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mt-1">
                            <Form.Label><FormattedMessage id="messaging.create.conversation.userId"/><span className="ml-1 text-danger">*</span></Form.Label>
                            <Form.Control
                                ref={inputRef} id="id" name="id" type="text" placeholder="daf93d16-8884-4948-955..."
                            />
                        </Form.Group>
                        {inError &&
                        <Alert variant="danger" onClose={() => setInError(false)} dismissible>
                            <p><FormattedMessage id="messaging.create.conversation.error"/></p>
                        </Alert>
                        }
                        <div className="d-flex justify-content-around mt-4">
                            {loading
                                ? <Spinner animation="border" variant="primary"/>
                                : <Button className="mr-4 ml-4" variant="primary" type="submit" onClick={handleSubmit} block><FormattedMessage id="messaging.create.conversation.submit"/></Button>
                            }
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

CreateConversationModal.propTypes = {
    setActiveKey: PropTypes.func,
    conversations: PropTypes.array,
    setConversations: PropTypes.func
};

export default CreateConversationModal;
