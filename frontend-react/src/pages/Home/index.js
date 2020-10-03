import React from 'react';
import '../App.css';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

function Home () {
    return (
        <div className="App">
            <FormattedMessage id="homepage.title">
                {title => <Helmet><title>{title}</title></Helmet>}
            </FormattedMessage>
            <h1><FormattedMessage id="homepage.title"/></h1>
            <p><FormattedMessage id="homepage.info"/></p>
        </div>
    );
}

export default Home;
