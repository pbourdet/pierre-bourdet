import React from 'react';
import '../../pages/App.css';
import { Link } from 'react-router-dom';
import { useLocaleUpdate } from '../../contexts/LocaleContext';

function Nav () {
    const navStyle = {
        color: 'white'
    };

    const toggleLocale = useLocaleUpdate();

    return (
        <nav>
            <button onClick={toggleLocale}>Toggle Locale</button>
            <Link style={navStyle} to="/">
                <h3>Welcome</h3>
            </Link>
            <ul className="nav-links">
                <Link style={navStyle} to="/about">
                    <li>About</li>
                </Link>
                <Link style={navStyle} to="/resume">
                    <li>Resume</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;
