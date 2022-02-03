import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  it('should render correctly', () => {
    render(
      <Modal
        title={'Modal'}
        handleClose={() => {}}
        open={true}
        hasActions={true}
        children={<p>Hello</p>}
        actions={<p>Actions</p>}
        style={{}}
        hasCloseButton={true}
        headerButton={<p>Header Buttons</p>}
      />
    );
    expect(screen.getByText('Modal')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByText('Header Buttons')).toBeInTheDocument();
  });
});
