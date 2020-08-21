import React from 'react';
import Nav from "./index";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from '@testing-library/react';

test('renders nav bar', () => {
    const { getByText } = render(
        <Router>
            <Nav/>
        </Router>);
    const welcomeText = getByText(/Welcome/i);
    expect(welcomeText).toBeInTheDocument();
});