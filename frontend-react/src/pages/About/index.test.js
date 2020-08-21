import React from 'react';
import About from "./index";
import { render } from '@testing-library/react';

test('renders about page', () => {
    const { getByText } = render(<About/>);
    const aboutText = getByText(/About/i);
    expect(aboutText).toBeInTheDocument();
});