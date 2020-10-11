import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {IntlProvider} from "react-intl";
import translations from "../translations";

const LocaleContext = React.createContext();
const LocaleUpdateContext = React.createContext();

export function useLocale () {
    return useContext(LocaleContext);
}

export function useLocaleUpdate () {
    return useContext(LocaleUpdateContext);
}

function LocaleProvider ({ children }) {
    const [locale, setLocale] = useState('en');

    function updateLocale (newLocale) {
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

export default LocaleProvider;