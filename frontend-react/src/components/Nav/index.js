import React from 'react';
import '../../pages/App.css';
import { Link } from 'react-router-dom';
import { useLocaleUpdate } from '../../contexts/LocaleContext';
import { FormattedMessage } from 'react-intl';

function Nav () {
    const navStyle = {
        color: 'white'
    };

    const toggleLocale = useLocaleUpdate();

    return (
        <nav>
            <button onClick={toggleLocale}><FormattedMessage id="navbar.langage"/></button>
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

export default Nav;
