import React from 'react';
import LoginModal from './index';
import { mountWithIntl } from '../../helpers/intl-enzyme-test-helper';

test('render modal', () => {
    const wrapper = mountWithIntl(<LoginModal/>);
    const buttonText = wrapper.find('Button').text();

    expect(buttonText).toBe('Sign in');
});
