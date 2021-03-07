import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

function Resume () {
    return (
        <>
            <FormattedMessage id="resume.title">
                {title => <Helmet><title>{title}</title></Helmet>}
            </FormattedMessage>
            <h1><FormattedMessage id="resume.title"/></h1>
        </>
    );
}

export default Resume;
