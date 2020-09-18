import React from 'react';
import '../App.css';
import { FormattedMessage } from 'react-intl';

function About () {
    return (
        <div>
            <h1><FormattedMessage id="about.title"/></h1>
        </div>
    );
}

export default About;
