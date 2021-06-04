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

function NavigationBar () {
    const auth = useAuth();
    const updateAuth = useAuthUpdate();

    const logout = () => {
        updateAuth(null);
        localStorage.removeItem('user');
        toast.info(<FormattedMessage id="toast.user.logout" />);
    };

    return (
        <div className="shadow-sm">
            <Navbar collapseOnSelect bg="light" expand="md">
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
                            <Nav.Link href="#" as={Link} to="/resume">
                                <FormattedMessage id="navbar.resume"/>
                            </Nav.Link>
                            <NavDropdown title="Apps" id="basic-nav-dropdown">
                                <NavDropdown.Item as="span">
                                    <Nav.Link href="#" as={Link} to="/todo">
                                        Todo list
                                    </Nav.Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            {auth
                                ? <>
                                    <Nav.Link href="#" as={Link} to="/me">
                                        <FormattedMessage id="navbar.profile"/>
                                    </Nav.Link>
                                    <Nav.Link href="#" onClick={logout} className="btn btn-link" as="span">
                                        <FormattedMessage id="navbar.logout"/>
                                    </Nav.Link>
                                </>
                                : <>
                                    <SigninModal/>
                                    <SignupModal/>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavigationBar;
