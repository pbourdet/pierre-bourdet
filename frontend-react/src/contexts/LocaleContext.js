import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

const LocaleContext = React.createContext();
const LocaleUpdateContext = React.createContext();

export function useLocale () {
    return useContext(LocaleContext);
}

export function useLocaleUpdate () {
    return useContext(LocaleUpdateContext);
}

function LocaleProvider ({ children }) {
    const [locale, setLocale] = useState('fr');

    function toggleLocale () {
        const newLocale = locale === 'fr' ? 'en' : 'fr';
        setLocale(newLocale);
    }

    return (
        <LocaleContext.Provider value={locale}>
            <LocaleUpdateContext.Provider value={toggleLocale}>
                {children}
            </LocaleUpdateContext.Provider>
        </LocaleContext.Provider>
    );
}

LocaleProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default LocaleProvider;
