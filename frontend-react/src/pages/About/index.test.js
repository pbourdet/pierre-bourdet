import React from 'react';
import About from './index';
import { mountWithIntl } from '../../helpers/intl-enzyme-test-helper';

test('renders home page', () => {
    const wrapper = mountWithIntl(<About />);
    const title = wrapper.find('h1').text();

    expect(title).toBe('About');
});
