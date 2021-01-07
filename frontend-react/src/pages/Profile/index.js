import React from 'react';
import { useAuth } from '../../contexts/AuthContext/index';
import { Redirect } from 'react-router-dom';
import UpdatePasswordModal from '../../components/UpdatePasswordModal';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

function Profile () {
    const auth = useAuth();

    if (auth === null) {
        return <Redirect to="/"/>;
    }

    return (
        <div className="App">
            <Container>
                <Card className="m-2 p-3">
                    <Card.Body>
                        <Card.Title className="mb-4">
                            <FormattedMessage id="profile.settings"/>
                        </Card.Title>
                        <Row>
                            <Col sm={6}>
                            </Col>
                            <Col sm={6}>
                                <UpdatePasswordModal/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Profile;
