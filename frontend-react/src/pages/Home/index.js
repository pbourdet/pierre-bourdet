import React from 'react';
import '../App.css';
import { FormattedMessage } from 'react-intl';

function Home () {
    return (
        <div className="App">
            <h1><FormattedMessage id="home"/></h1>
            <p>Site under construction !</p>
        </div>
    );
}

export default Home;
