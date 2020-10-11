import React from 'react';
import SignupModal from './index';
import { mountWithIntl } from '../../helpers/intl-enzyme-test-helper';

describe('<SignupModal />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mountWithIntl(<SignupModal />);
    });

    it('should render component', function () {
        const button = wrapper.find('NavbarText');

        expect(button.text()).toBe('Sign up');
    });

    it('should open model on click', function () {
        expect(wrapper.find('Modal').first().props().show).toBe(false);

        wrapper.find('NavbarText').simulate('click');
        expect(wrapper.find('Modal').first().props().show).toBe(true);
    });

    it('should have 4 inputs', function () {
        wrapper.find('NavbarText').simulate('click');

        expect(wrapper.find('input')).toHaveLength(4);
    });

    it('should make submit button enabled when filling form', function () {
        wrapper.find('NavbarText').simulate('click');

        expect(wrapper.find('.btn-primary').first().props().disabled).toBe(true);

        wrapper.find('input#email').last().simulate('change', { target: { name: 'email', value: 'test@test.fr' } });
        wrapper.find('input#password').last().simulate('change', { target: { name: 'password', value: 'Azerty123' } });
        wrapper.find('input#nickname').last().simulate('change', { target: { name: 'nickname', value: 'test' } });
        wrapper.find('input#confirmPassword').last().simulate('change', { target: { name: 'confirmPassword', value: 'Azerty123' } });

        expect(wrapper.find('.btn-primary').first().props().disabled).toBe(false);
    });
});
