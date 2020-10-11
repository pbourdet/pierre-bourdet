import React from 'react';
import '../../pages/App.css';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import LocaleSelector from '../LocaleSelector';
import { Container, Navbar, Nav } from 'react-bootstrap';
import SigninModal from '../SigninModal';
import SignupModal from '../SignupModal';
import { useAuth, useAuthUpdate } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

function NavigationBar () {
    const auth = useAuth();
    const updateAuth = useAuthUpdate();

    const logout = () => {
        updateAuth(null);
        toast.info(<FormattedMessage id="toast.user.logout" />);
    };

    return (
        <div>
            <Navbar bg="light" expand="md">
                <Container>
                    <LocaleSelector/>
                    <Link to="/">
                        <Navbar.Brand className="p-2" as="span">
                            <FormattedMessage id="navbar.home"/>
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/about">
                                <Nav.Link as="span">
                                    <FormattedMessage id="navbar.about"/>
                                </Nav.Link>
                            </Link>
                            <Link to="/resume">
                                <Nav.Link as="span">
                                    <FormattedMessage id="navbar.resume"/>
                                </Nav.Link>
                            </Link>
                            <Link to="/todo">
                                <Nav.Link as="span">
                                    Todo
                                </Nav.Link>
                            </Link>
                        </Nav>
                        {auth
                            ? <>
                                <Link to="/me">
                                    <Navbar.Text className="btn btn-link" as="span">
                                        <FormattedMessage id="navbar.profile"/>
                                    </Navbar.Text>
                                </Link>
                                <Navbar.Text onClick={logout} className="btn btn-link" as="span">
                                    <FormattedMessage id="navbar.logout"/>
                                </Navbar.Text>
                            </>
                            : <>
                                <SigninModal/>
                                <SignupModal/>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavigationBar;
