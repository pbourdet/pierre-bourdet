import React, { useEffect } from 'react';
import img from '../../assets/img';
import { Dropdown } from 'react-bootstrap';
import { useLocale, useLocaleUpdate } from '../../contexts/LocaleContext/index';
import { FormattedMessage } from 'react-intl';
import updateLanguage from '../../requests/updateLanguage';
import { useAuth, useAuthUpdate } from '../../contexts/AuthContext';
import refreshToken from '../../requests/refreshToken';

function LocaleSelector () {
    const locale = useLocale();
    const updateLocale = useLocaleUpdate();
    const supportedLocales = ['fr-FR', 'en-GB'];
    const localeChoiceList = supportedLocales.filter((value) => value !== locale);
    const auth = useAuth();
    const updateAuth = useAuthUpdate();

    useEffect(() => {
        async function updateLanguageSelected () {
            if (auth !== null) {
                await refreshToken(auth, updateAuth);
                updateLanguage(locale);
            }
        }

        updateLanguageSelected();
    }, [locale, auth, updateAuth]);

    return (
        <Dropdown>
            <Dropdown.Toggle style={{ cursor: 'pointer' }} as="div" className="mr-2" size="sm" variant="link" id="dropdown-basic">
                <img className="mr-1" alt={'flag_' + locale} height="30" width="35" src={img.flag[locale]}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {localeChoiceList.map((choice, index) => (
                    <Dropdown.Item key={index} onClick={() => updateLocale(choice)}>
                        <img id={`${choice}-flag`} className="mr-1"
                            height={25} width={25}
                            alt={`${choice}-flag`} src={img.flag[choice]}
                        />
                        <FormattedMessage id={`languages.${choice}`}/>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default LocaleSelector;
