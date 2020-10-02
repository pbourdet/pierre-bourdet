import * as React from 'react';
import img from '../../assets/img';
import PropTypes from 'prop-types';

function LocaleSelector ({ locale, setLocale }) {
    const flag = locale === 'fr' ? img.flag.uk : img.flag.french;

    function toggleLocale () {
        const newLocale = locale === 'fr' ? 'en' : 'fr';
        setLocale(newLocale);
    }

    return (
        <img id="language-flag" className="mr-4" onClick={toggleLocale} alt={flag} height="30" width="35" src={flag}/>
    );
}

LocaleSelector.propTypes = {
    locale: PropTypes.string,
    setLocale: PropTypes.func
};

export default LocaleSelector;
