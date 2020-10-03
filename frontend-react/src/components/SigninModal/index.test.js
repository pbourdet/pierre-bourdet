import React from 'react';
import SigninModal from './index';
import { mountWithIntl } from '../../helpers/intl-enzyme-test-helper';

test('render modal', () => {
    const wrapper = mountWithIntl(<SigninModal/>);
    const buttonText = wrapper.find('Button').text();

    expect(buttonText).toBe('Sign in');
});
