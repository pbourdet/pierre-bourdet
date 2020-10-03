import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { mountWithIntl } from '../helpers/intl-enzyme-test-helper';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
});

test('french flag changes language to french', () => {
    const wrapper = mountWithIntl(<App/>);

    expect(wrapper.find('NavbarBrand').text()).toBe('Homepage');
    wrapper.find('DropdownToggle').simulate('click');
    wrapper.find('LocaleSelector').find('#french-flag').simulate('click');
    expect(wrapper.find('NavbarBrand').text()).toBe('Accueil');
});
