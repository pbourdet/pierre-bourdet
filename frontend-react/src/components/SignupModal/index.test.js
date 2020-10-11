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

test('modal has 4 inputs', () => {
    const wrapper = mountWithIntl(<SignupModal/>);
    wrapper.find('NavbarText').simulate('click');

    expect(wrapper.find('input')).toHaveLength(4);
});

test('submit button is disabled then enabled when input filled', () => {
    const wrapper = mountWithIntl(<SignupModal/>);
    wrapper.find('NavbarText').simulate('click');

    expect(wrapper.find('.btn-primary').first().props().disabled).toBe(true);

    wrapper.find('input#email').last().simulate('change', { target: { name: 'email', value: 'test@test.fr' } });
    wrapper.find('input#password').last().simulate('change', { target: { name: 'password', value: 'Azerty123' } });
    wrapper.find('input#nickname').last().simulate('change', { target: { name: 'nickname', value: 'test' } });
    wrapper.find('input#confirmPassword').last().simulate('change', { target: { name: 'confirmPassword', value: 'Azerty123' } });

    expect(wrapper.find('.btn-primary').first().props().disabled).toBe(false);
});
