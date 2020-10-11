import React from 'react';
import SigninModal from './index';
import { mountWithIntl } from '../../helpers/intl-enzyme-test-helper';

describe('<SigninModal />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mountWithIntl(<SigninModal />);
    });

    it('should render component', function () {
        const button = wrapper.find('Button');

        expect(button.text()).toBe('Sign in');
    });

    it('should open model on click', function () {
        expect(wrapper.find('Modal').first().props().show).toBe(false);

        wrapper.find('button').simulate('click');
        expect(wrapper.find('Modal').first().props().show).toBe(true);
    });

    it('should make submit button enabled when filling form', function () {
        wrapper.find('button').simulate('click');

        expect(wrapper.find('.btn-primary').last().props().disabled).toBe(true);

        wrapper.find('input#email').last().simulate('change', { target: { name: 'email', value: 'test@test.fr' } });
        wrapper.find('input#password').last().simulate('change', { target: { name: 'password', value: 'Azerty123' } });

        expect(wrapper.find('.btn-primary').last().props().disabled).toBe(false);
    });
});
