import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import translations from '../../translations';

const LocaleContext = React.createContext();
const LocaleUpdateContext = React.createContext();

export function useLocale () {
    return useContext(LocaleContext);
}

export function useLocaleUpdate () {
    return useContext(LocaleUpdateContext);
}

export default function LocaleProvider ({ children }) {
    const currentLocale = localStorage.getItem('locale') || 'en-GB';

    const [locale, setLocale] = useState(currentLocale);

    function updateLocale (newLocale) {
        localStorage.setItem('locale', newLocale);
        setLocale(newLocale);
    }

    return (
        <LocaleContext.Provider value={locale}>
            <LocaleUpdateContext.Provider value={updateLocale}>
                <IntlProvider locale={locale} messages={translations[locale]}>
                    {children}
                </IntlProvider>
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
