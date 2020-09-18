import React from 'react';
import '../App.css';
import { FormattedMessage } from 'react-intl';

function Resume () {
    return (
        <div className="App">
            <h1><FormattedMessage id="resume.title"/></h1>
        </div>
    );
}

export default Resume;
