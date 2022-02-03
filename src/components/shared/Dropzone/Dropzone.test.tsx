import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Dropdzone from './Dropdzone';

describe('Dropdzone', () => {
  it('should render correctly', () => {
    render(<Dropdzone handleAddFile={() => {}} />);
    expect(screen.getByText('Drop files here to upload')).toBeInTheDocument();
  });
});
