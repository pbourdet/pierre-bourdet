import React from 'react';
import AuthProvider, { useAuth, useAuthUpdate } from './index';
import { mount } from 'enzyme';

describe('AuthProvider', () => {
    it('should authenticate user', function () {
        const TestComponent = () => {
            const auth = useAuth();
            const updateAuth = useAuthUpdate();
            const testAuth = {
                token: 'token-test'
            };

            return <>
                <div>{auth ? auth.token : null}</div>
                <button onClick={() => updateAuth(testAuth)}>Auth</button>
            </>;
        };

        const wrapper = mount(<AuthProvider><TestComponent/></AuthProvider>);

        expect(wrapper.find('div').text()).toEqual('');

        wrapper.find('button').simulate('click');

        expect(wrapper.find('div').text()).toEqual('token-test');
    });
});
