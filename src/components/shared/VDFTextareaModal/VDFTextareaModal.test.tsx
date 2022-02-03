import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import VDFTextareaModal from './VDFTextareaModal';

describe('VDFTextareaModal', () => {
  it('should render correctly', () => {
    render(
      <VDFTextareaModal label='Label Test' sublabel='Sublabel Test' textareaValue='' setTextareaValue={() => {}} />
    );
    expect(screen.getByText('Label Test')).toBeInTheDocument();
    expect(screen.getByText('Sublabel Test')).toBeInTheDocument();
  });

  it('should open the modal correctly', () => {
    const { container } = render(
      <VDFTextareaModal label='Label Test' sublabel='Sublabel Test' textareaValue='' setTextareaValue={() => {}} />
    );

    fireEvent.click(container.querySelector('button') as Element);

    expect(screen.getByText('Edit Label Test')).toBeInTheDocument();
  });

  it('should save the text correctly', () => {
    const mockSetTextareaValue = jest.fn();
    const { container } = render(
      <VDFTextareaModal
        label='Label Test'
        sublabel='Sublabel Test'
        textareaValue=''
        setTextareaValue={mockSetTextareaValue}
      />
    );

    fireEvent.click(container.querySelector('button') as Element);

    fireEvent.click(screen.getByTestId('btn-save'));

    expect(mockSetTextareaValue).toBeCalled();

    mockSetTextareaValue.mockClear();
  });

  it('should close the modal correctly', () => {
    const { container } = render(
      <VDFTextareaModal label='Label Test' sublabel='Sublabel Test' textareaValue='' setTextareaValue={() => {}} />
    );

    fireEvent.click(container.querySelector('button') as Element);

    fireEvent.click(screen.getByTestId('btn-cancel'));
  });
});
