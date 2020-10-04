import React from 'react';
import SignupModal from './index';
import { mountWithIntl } from '../../helpers/intl-enzyme-test-helper';

test('component renders', () => {
    const wrapper = mountWithIntl(<SignupModal/>);
    const button = wrapper.find('NavbarText');

    expect(button.text()).toBe('Sign up');
});

test('button open modal', () => {
    const wrapper = mountWithIntl(<SignupModal/>);
    expect(wrapper.find('Modal').first().props().show).toBe(false);

    wrapper.find('NavbarText').simulate('click');
    expect(wrapper.find('Modal').first().props().show).toBe(true);
});

test('cancel button close modal', () => {
    const wrapper = mountWithIntl(<SignupModal/>);
    wrapper.find('NavbarText').simulate('click');
    wrapper.find('.btn-warning').simulate('click');

    expect(wrapper.find('Modal').first().props().show).toBe(false);
});

test('modal has 4 inputs', () => {
    const wrapper = mountWithIntl(<SignupModal/>);
    wrapper.find('NavbarText').simulate('click');

    expect(wrapper.find('input')).toHaveLength(4);
});
