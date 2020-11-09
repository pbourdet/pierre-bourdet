import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

function About () {
    return (
        <div>
            <FormattedMessage id="about.title">
                {title => <Helmet><title>{title}</title></Helmet>}
            </FormattedMessage>
            <h1><FormattedMessage id="about.title"/></h1>
        </div>
    );
}

export default About;
