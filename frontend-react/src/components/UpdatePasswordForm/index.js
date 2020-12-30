import React, { useState } from 'react';
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import useUserFormValidation from '../../hooks/useUserFormValidation';
import UserFormInput from '../Input/UserFormInput';
import { FormattedMessage } from 'react-intl';
import { updatePasswordSubmit } from '../../requests/submitUserForm';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

function UpdatePasswordForm () {
    const auth = useAuth();
    const inputTypes = ['currentPassword', 'newPassword', 'confirmPassword'];
    const { values, handleChange, errors, touched, clearAll } = useUserFormValidation();
    const [loading, setLoading] = useState(false);
    const [inError, setInError] = useState(false);
    const isFormValid = Object.keys(errors).length === 0 && Object.keys(touched).length === inputTypes.length;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const isUpdated = await updatePasswordSubmit(values, auth);

        if (isUpdated) {
            setInError(false);
            clearAll();
            toast.success(<FormattedMessage id='toast.user.updatePassword'/>);
        } else {
            setInError(true);
        }
        setLoading(false);
    };

    return (
        <Row>
            <Col md={6} className="m-2">
                <Card className="p-2">
                    <h4 className="mb-3"><FormattedMessage id="updatePassword.title"/></h4>
                    <Form onSubmit={handleSubmit}>
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
                                : <Button className="mr-4 ml-4" disabled={!isFormValid} variant="primary" type="submit" block>
                                    <FormattedMessage id="updatePassword.submitButton"/>
                                </Button>
                            }
                        </div>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

export default UpdatePasswordForm;
