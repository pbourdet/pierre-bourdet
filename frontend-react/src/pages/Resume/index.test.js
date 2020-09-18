import React from 'react';
import Resume from './index';
import { mountWithIntl } from '../../helpers/intl-enzyme-test-helper';

test('renders home page', () => {
    const wrapper = mountWithIntl(<Resume />);
    const title = wrapper.find('h1').text();

    expect(title).toBe('Resume');
});
