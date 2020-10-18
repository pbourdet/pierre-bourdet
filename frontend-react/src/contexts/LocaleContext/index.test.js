import React from 'react';
import { mount } from 'enzyme';
import LocaleProvider, { useLocale, useLocaleUpdate } from './index';

describe('LocaleProvider', () => {
    it('should change locale', function () {
        const TestComponent = () => {
            const locale = useLocale();
            const updateLocale = useLocaleUpdate();

            return <>
                <div>{locale}</div>
                <button onClick={() => updateLocale('fr-FR')}>Change locale</button>
            </>;
        };

        const wrapper = mount(<LocaleProvider><TestComponent/></LocaleProvider>);

        expect(wrapper.find('div').text()).toEqual('en-GB');

        wrapper.find('button').simulate('click');

        expect(wrapper.find('div').text()).toEqual('fr-FR');
    });
});
