import React from 'react';
import img from '../../assets/img';
import { Dropdown } from 'react-bootstrap';
import { useLocale, useLocaleUpdate } from '../../contexts/LocaleContext/index';

function LocaleSelector () {
    const locale = useLocale();
    const updateLocale = useLocaleUpdate();

    return (
        <Dropdown>
            <Dropdown.Toggle as="div" className="mr-2" size="sm" variant="link" id="dropdown-basic">
                <img className="mr-1" alt={'flag_' + locale} height="30" width="35" src={img.flag[locale]}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => updateLocale('fr')}><img id="french-flag" className="mr-1" alt="flag_fr" height="25" width="30" src={img.flag.fr}/>Français</Dropdown.Item>
                <Dropdown.Item onClick={() => updateLocale('en')}><img className="mr-1" alt="flag_en" height="25" width="30" src={img.flag.en}/>English</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default LocaleSelector;
