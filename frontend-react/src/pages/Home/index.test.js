import React from 'react';
import Home from './index';
import { BrowserRouter as Router } from 'react-router-dom';
import { mountWithIntl } from '../../helpers/intl-enzyme-test-helper';

test('renders home page', () => {
    const wrapper = mountWithIntl(
        <Router>
            <Home />
        </Router>
    );
    const title = wrapper.find('h1').text();

    expect(title).toBe('Homepage');
});
