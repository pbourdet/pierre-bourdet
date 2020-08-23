import React from 'react';
import '../../pages/App.css';
import { Link } from 'react-router-dom';

function Nav () {
    const navStyle = {
        color: 'white'
    };

    return (
        <nav>
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