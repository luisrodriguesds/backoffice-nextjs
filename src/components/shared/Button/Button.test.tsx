import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button text='Hello' clickFn={() => {}} color='white' />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
