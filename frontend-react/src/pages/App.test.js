import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { mountWithIntl } from '../helpers/intl-enzyme-test-helper';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><App/></Router>, div);
});

test('french flag changes language to french', () => {
    const wrapper = mountWithIntl(<Router><App/></Router>);

    expect(wrapper.find('NavbarBrand').text()).toBe('Homepage');
    wrapper.find('LocaleSelector').find('DropdownToggle').simulate('click');
    wrapper.find('LocaleSelector').find('#fr-FR-flag').simulate('click');
    expect(wrapper.find('NavbarBrand').text()).toBe('Accueil');
});
