import React from 'react';
import '../App.css';
import { FormattedMessage } from 'react-intl';

function Home () {
    return (
        <div className="App">
            <h1><FormattedMessage id="homepage.title"/></h1>
            <p><FormattedMessage id="homepage.info"/></p>
        </div>
    );
}

export default Home;
