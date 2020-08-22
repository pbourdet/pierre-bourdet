import React from 'react';
import Home from './index';
import { render } from '@testing-library/react';

test('renders home page', () => {
    const { getByText } = render(<Home/>);
    const homeText = getByText(/Homepage/i);
    expect(homeText).toBeInTheDocument();
});
