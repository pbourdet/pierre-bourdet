import React from 'react';
import '../../pages/App.css';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import LocaleSelector from '../LocaleSelector';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import SigninModal from '../SigninModal';
import SignupModal from '../SignupModal';
import { useAuth, useAuthUpdate } from '../../contexts/AuthContext/index';
import { toast } from 'react-toastify';
import { logout } from '../../requests/user';

function NavigationBar () {
    const auth = useAuth();
    const updateAuth = useAuthUpdate();

    const handleLogout = () => {
        logout(updateAuth);
        toast.info(<FormattedMessage id="toast.user.logout" />);
    };

    return (
        <div className="shadow-sm">
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
                            <Link to="/resume">
                                <Nav.Link as="span">
                                    <FormattedMessage id="navbar.resume"/>
                                </Nav.Link>
                            </Link>
                            <NavDropdown title="Apps" id="basic-nav-dropdown">
                                <NavDropdown.Item as="span">
                                    <Link to="/todo">
                                        <Nav.Link as="span">
                                            Todo list
                                        </Nav.Link>
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={(e) => e.currentTarget.blur()} as={Link} to="/snake">
                                    <Nav.Link as="span">
                                        Snake
                                    </Nav.Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/tennis/rankings">
                                    <Nav.Link as="span">
                                        <FormattedMessage id="navbar.tennis"/>
                                    </Nav.Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/messaging">
                                    <Nav.Link as="span">
                                        <FormattedMessage id="navbar.messaging"/>
                                    </Nav.Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        {auth
                            ? <>
                                <Link to="/me">
                                    <Navbar.Text className="btn btn-link" as="span">
                                        <FormattedMessage id="navbar.profile"/>
                                    </Navbar.Text>
                                </Link>
                                <Navbar.Text onClick={() => handleLogout()} className="btn btn-link" as="span">
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
