import React from 'react';
import LocaleSelector from './index';
import { shallow } from 'enzyme';

test('renders dropdown', () => {
    const wrapper = shallow(<LocaleSelector/>);
    const image = wrapper.find('img');

    expect(image).toHaveLength(3);
});
