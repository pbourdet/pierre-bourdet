import React from 'react';
import Home from './index';
import { mountWithIntl } from '../../helpers/intl-enzyme-test-helper';

test('renders home page', () => {
    const wrapper = mountWithIntl(<Home />);
    const title = wrapper.find('h1').text();

    expect(title).toBe('Homepage');
});
