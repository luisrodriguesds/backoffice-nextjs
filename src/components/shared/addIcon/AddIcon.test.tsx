import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AddIcon from './AddIcon';

describe('AddIcon', () => {
  it('should render correctly', () => {
    render(<AddIcon handleImageChange={() => {}} showErrorMessage={true} displayIconErrorMessage='Error' />);
    expect(screen);
  });
  it('should render correctly', () => {
    render(<AddIcon handleImageChange={() => {}} showErrorMessage={false} />);
    expect(screen);
  });
});
