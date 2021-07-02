import React from 'react';
import { useAuth } from '../../contexts/AuthContext/index';
import { Redirect } from 'react-router-dom';
import UpdatePasswordModal from '../../components/UpdatePasswordModal';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import DeleteUserButton from '../../components/DeleteUserButton';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import variants from '../../config/framer-motion';

function Profile () {
    const auth = useAuth();

    if (auth === null) {
        return <Redirect to="/"/>;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <motion.div variants={variants} initial="hidden" animate="visible">
            <Container>
                <FormattedMessage id="profile.title">
                    {title => <Helmet><title>{title}</title></Helmet>}
                </FormattedMessage>
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
        </motion.div>
    );
}

export default Profile;
