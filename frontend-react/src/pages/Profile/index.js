import React from 'react';
import { useAuth } from '../../contexts/AuthContext/index';
import { Redirect } from 'react-router-dom';
import UpdatePasswordModal from '../../components/UpdatePasswordModal';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import DeleteUserButton from '../../components/DeleteUserButton';

function Profile () {
    const auth = useAuth();

    if (auth === null) {
        return <Redirect to="/"/>;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Container>
            <Card className="m-2 p-3 shadow">
                <Card.Body>
                    <Card.Title className="mb-4">
                        <FormattedMessage id="profile.settings"/>
                    </Card.Title>
                    <Row>
                        <Col sm={6}>
                        </Col>
                        <Col sm={6}>
                            <div>
                                <UpdatePasswordModal/>
                            </div>
                            <div>
                                <DeleteUserButton user={user}/>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Profile;
