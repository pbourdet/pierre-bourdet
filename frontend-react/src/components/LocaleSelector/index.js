import React from 'react';
import img from '../../assets/img';
import { Dropdown } from 'react-bootstrap';
import { useLocale, useLocaleUpdate } from '../../contexts/LocaleContext/index';
import { FormattedMessage } from 'react-intl';

function LocaleSelector () {
    const locale = useLocale();
    const updateLocale = useLocaleUpdate();
    const supportedLocales = ['fr-FR', 'en-GB'];
    const localeChoiceList = supportedLocales.filter((value) => value !== locale);

    return (
        <Dropdown>
            <Dropdown.Toggle as="div" className="mr-2" size="sm" variant="link" id="dropdown-basic">
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
