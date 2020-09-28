import React from 'react';
import '../../pages/App.css';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

function Nav ({ locale, setLocale }) {
    const navStyle = {
        color: 'white'
    };

    function toggleLocale () {
        const newLocale = locale === 'fr' ? 'en' : 'fr';
        setLocale(newLocale);
    }

    return (
        <nav>
            <button onClick={toggleLocale}><FormattedMessage id="navbar.language"/></button>
            <Link style={navStyle} to="/">
                <h3><FormattedMessage id="navbar.welcome"/></h3>
            </Link>
            <ul className="nav-links">
                <Link style={navStyle} to="/about">
                    <li><FormattedMessage id="navbar.about"/></li>
                </Link>
                <Link style={navStyle} to="/resume">
                    <li><FormattedMessage id="navbar.resume"/></li>
                </Link>
            </ul>
        </nav>
    );
}

Nav.propTypes = {
    locale: PropTypes.string,
    setLocale: PropTypes.func
};

export default Nav;
