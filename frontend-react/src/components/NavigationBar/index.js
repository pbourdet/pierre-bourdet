import React from 'react';
import '../../pages/App.css';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import LocaleSelector from '../LocaleSelector';
import {
    Container,
    Navbar,
    Nav
} from 'react-bootstrap';
import LoginModal from '../LoginModal';

function NavigationBar ({ locale, setLocale }) {
    return (
        <div>
            <Navbar bg="light" expand="md">
                <Container>
                    <LocaleSelector locale={locale} setLocale={setLocale}/>
                    <Link to="/">
                        <Navbar.Brand as="span">
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
                        <LoginModal/>
                        <Nav.Item className="btn" as="span">
                            <FormattedMessage id="navbar.signup"/>
                        </Nav.Item>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

NavigationBar.propTypes = {
    locale: PropTypes.string,
    setLocale: PropTypes.func
};

export default NavigationBar;
