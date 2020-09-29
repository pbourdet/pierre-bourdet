import React, { useState } from 'react';
import '../../pages/App.css';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import img from '../../assets/img';
import {
    Button,
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    NavbarText,
    Nav as Navigation,
    NavLink
} from 'reactstrap';

function Nav ({ locale, setLocale }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavBar = () => setIsOpen(!isOpen);

    function toggleLocale () {
        const newLocale = locale === 'fr' ? 'en' : 'fr';
        setLocale(newLocale);
    }

    const flag = locale === 'fr' ? img.flag.uk : img.flag.french;

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Container>
                    <img id="language-flag" className="mr-4" onClick={toggleLocale} alt={flag} height="30" width="35" src={flag}/>
                    <Link to="/">
                        <NavbarBrand tag="span">
                            <FormattedMessage id="navbar.home"/>
                        </NavbarBrand>
                    </Link>
                    <NavbarToggler onClick={toggleNavBar} />
                    <Collapse isOpen={isOpen} navbar>
                        <Navigation className="mr-auto" navbar>
                            <Link to="/about">
                                <NavLink tag="span">
                                    <FormattedMessage id="navbar.about"/>
                                </NavLink>
                            </Link>
                            <Link to="/resume">
                                <NavLink tag="span">
                                    <FormattedMessage id="navbar.resume"/>
                                </NavLink>
                            </Link>
                            <Link to="/todo">
                                <NavLink tag="span">
                                    Todo
                                </NavLink>
                            </Link>
                        </Navigation>
                        <Button color="primary">
                            <FormattedMessage id="navbar.signin"/>
                        </Button>
                        <NavbarText className="btn">
                            <FormattedMessage id="navbar.signup"/>
                        </NavbarText>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

Nav.propTypes = {
    locale: PropTypes.string,
    setLocale: PropTypes.func
};

export default Nav;
