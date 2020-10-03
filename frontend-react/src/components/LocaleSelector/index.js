import * as React from 'react';
import img from '../../assets/img';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';

function LocaleSelector ({ locale, setLocale }) {
    return (
        <Dropdown>
            <Dropdown.Toggle as="div" className="mr-2" size="sm" variant="link" id="dropdown-basic">
                <img className="mr-1" alt={'flag_' + locale} height="30" width="35" src={img.flag[locale]}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => setLocale('fr')}><img id="french-flag" className="mr-1" alt="flag_fr" height="25" width="30" src={img.flag.fr}/>Français</Dropdown.Item>
                <Dropdown.Item onClick={() => setLocale('en')}><img className="mr-1" alt="flag_fr" height="25" width="30" src={img.flag.en}/>English</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

LocaleSelector.propTypes = {
    locale: PropTypes.string,
    setLocale: PropTypes.func
};

export default LocaleSelector;
