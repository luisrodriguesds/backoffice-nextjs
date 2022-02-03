import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import VDFAlertConfirm from './VDFAlertConfirm';

const mockHandleIsOpen = jest.fn();
const mockHandleConfirm = jest.fn();

beforeEach(() => {
  mockHandleIsOpen.mockClear();
  mockHandleConfirm.mockClear();
});

describe('VDFAlertConfirm', () => {
  it('Should render correctly component message', () => {
    render(
      <VDFAlertConfirm
        title='Title'
        isOpen={true}
        setIsOpen={() => {
          mockHandleIsOpen();
        }}
        message='This is a test'
        handleConfirm={() => {
          mockHandleConfirm();
        }}></VDFAlertConfirm>
    );
    expect(screen.queryByText('This is a test')).toBeInTheDocument();
  }),
    it('Should not show pop up', () => {
      render(
        <VDFAlertConfirm
          title='Title'
          isOpen={false}
          setIsOpen={() => {
            mockHandleIsOpen();
          }}
          message='This is a test'
          handleConfirm={() => {
            mockHandleConfirm();
          }}></VDFAlertConfirm>
      );
      expect(screen.queryByText('This is a test')).not.toBeInTheDocument();
    }),
    it('Should call setIsOpen when btn cancel is clicked', () => {
      render(
        <VDFAlertConfirm
          title='Title'
          isOpen={true}
          setIsOpen={() => {
            mockHandleIsOpen();
          }}
          message='This is a test'
          handleConfirm={() => {
            mockHandleConfirm();
          }}></VDFAlertConfirm>
      );
      fireEvent.click(screen.getByTestId('btn-cancel'));
      expect(mockHandleIsOpen).toBeCalled();
    }),
    it('Should call handleConfirm when btn confirm is clicked', () => {
      render(
        <VDFAlertConfirm
          title='Title'
          isOpen={true}
          setIsOpen={() => {
            mockHandleIsOpen();
          }}
          message='This is a test'
          handleConfirm={() => {
            mockHandleConfirm();
          }}></VDFAlertConfirm>
      );
      fireEvent.click(screen.getByTestId('btn-confirm'));
      expect(mockHandleConfirm).toBeCalled();
    });
});
