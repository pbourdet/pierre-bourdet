import React from 'react';
import Resume from "./index";
import { render } from '@testing-library/react';

test('renders resume page', () => {
    const { getByText } = render(<Resume/>);
    const resumeText = getByText(/Resume/i);
    expect(resumeText).toBeInTheDocument();
});