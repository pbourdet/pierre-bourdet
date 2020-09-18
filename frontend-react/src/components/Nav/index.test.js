import React from 'react';
import Nav from './index';
import { BrowserRouter as Router } from 'react-router-dom';
import { mountWithIntl } from '../../helpers/intl-enzyme-test-helper';

test('renders nav bar', () => {
    const wrapper = mountWithIntl(
        <Router>
            <Nav/>
        </Router>
    );
    const welcomeText = wrapper.find('h3').text();

    expect(welcomeText).toBe('Welcome');
});
