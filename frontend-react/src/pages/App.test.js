import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { mountWithIntl } from '../helpers/intl-enzyme-test-helper';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
});

test('button changes language', () => {
    const wrapper = mountWithIntl(<App/>);

    expect(wrapper.find('h3').text()).toBe('Welcome');
    wrapper.find('button').simulate('click');
    expect(wrapper.find('h3').text()).toBe('Bienvenue');
});
