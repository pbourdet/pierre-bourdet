import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Alert, Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import useUserFormValidation from '../../hooks/useUserFormValidation';
import UserFormInput from '../../components/Input/UserFormInput';
import { resetPassword } from '../../requests/resetPassword';
import { toast } from 'react-toastify';
import { useAuth, useAuthUpdate } from '../../contexts/AuthContext';
import { signinSubmit } from '../../requests/submitUserForm';

function ResetPassword () {
    const params = useParams();
    const { values, errors, touched, handleChange } = useUserFormValidation();
    const [loading, setLoading] = useState(false);
    const [inError, setInError] = useState(false);
    const inputTypes = ['password', 'confirmPassword'];
    const auth = useAuth();
    const updateAuth = useAuthUpdate();

    if (auth !== null) {
        return <Redirect to='/'/>;
    }

    const handleSignupSubmit = async () => {
        setLoading(true);
        setInError(false);

        const response = await resetPassword(params.token, values);
        setLoading(false);

        if (response === null) {
            setInError(true);

            return;
        }

        const { auth } = await signinSubmit({ email: response.email, password: values.password });

        updateAuth(auth);
        toast.success(<FormattedMessage id='toast.reset.success'/>);
    };

    return (
        <Container className="d-flex justify-content-around">
            <FormattedMessage id="reset.page.title">
                {title => <Helmet><title>{title}</title></Helmet>}
            </FormattedMessage>
            <Card style={{ width: '40rem' }} className="m-2 p-3 shadow">
                <Card.Body>
                    <Card.Title className="mb-4">
                        <FormattedMessage id="reset.page.title"/>
                    </Card.Title>
                    <Form className="text-left">
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
                            <p><FormattedMessage id="reset.page.error"/></p>
                        </Alert>
                        }
                        <div className="d-flex justify-content-around mt-4">
                            {loading
                                ? <Spinner animation="border" variant="primary"/>
                                : <Button className="mr-4 ml-4" disabled={false} variant="primary" onClick={handleSignupSubmit} block>
                                    <FormattedMessage id="reset.page.submit"/>
                                </Button>
                            }
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ResetPassword;
