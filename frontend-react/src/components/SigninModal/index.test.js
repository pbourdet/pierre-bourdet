import React from 'react';
import SigninModal from './index';
import { mountWithIntl } from '../../helpers/intl-enzyme-test-helper';

test('component renders', () => {
    const wrapper = mountWithIntl(<SigninModal/>);
    const button = wrapper.find('Button');

    expect(button.text()).toBe('Sign in');
});

test('button open modal', () => {
    const wrapper = mountWithIntl(<SigninModal/>);
    expect(wrapper.find('Modal').first().props().show).toBe(false);

    wrapper.find('button').simulate('click');
    expect(wrapper.find('Modal').first().props().show).toBe(true);
});

test('cancel button close modal', () => {
    const wrapper = mountWithIntl(<SigninModal/>);

    wrapper.find('button').simulate('click');
    wrapper.find('.btn-warning').simulate('click');

    expect(wrapper.find('Modal').first().props().show).toBe(false);
});

test('submit button is disabled then enabled when input filled', () => {
    const wrapper = mountWithIntl(<SigninModal/>);
    wrapper.find('button').simulate('click');

    expect(wrapper.find('.btn-success').first().props().disabled).toBe(true);

    wrapper.find('input#email').last().simulate('change', { target: { name: 'email', value: 'test@test.fr' } });
    wrapper.find('input#password').last().simulate('change', { target: { name: 'password', value: 'Azerty123' } });

    expect(wrapper.find('.btn-success').first().props().disabled).toBe(false);
});
