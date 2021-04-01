import React from 'react';
import Resume from './index';
import { mountWithIntl } from '../../helpers/intl-enzyme-test-helper';

test('renders home page', () => {
    const wrapper = mountWithIntl(<Resume />);
    const title = wrapper.find('div.h2').text();

    expect(title).toBe('Pierre Bourdet');
});
