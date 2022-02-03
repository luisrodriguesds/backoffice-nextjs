import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import VDFSelect from './VDFSelect';
import { act } from 'react-dom/test-utils';

const wait = (amount = 0) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

describe('VDFSelect.test', () => {
  const options = [
    {
      label: 'Test 1',
      value: 'test-1',
    },
    {
      label: 'Test 2',
      value: 'test-2',
    },
  ];

  it('should render correctly', () => {
    render(<VDFSelect handleChange={() => {}} options={options} value='' label='' />);
  });

  it('should render label correctly', () => {
    render(<VDFSelect handleChange={() => {}} options={options} value='' label='Label Test' />);
    expect(screen.queryByText('Label Test'));
  });

  it('should onChange correctly', async () => {
    const mockhandleChange = jest.fn((x) => x);
    render(<VDFSelect handleChange={mockhandleChange} options={options} value='test-2' label='Label Test' />);

    await actWait(500);

    const wrapperNode = screen.getByTestId('selectInput');

    const selectNode = wrapperNode.childNodes[1];

    fireEvent.change(selectNode, { target: { value: 'test-1' } });

    expect(mockhandleChange.mock.calls).toHaveLength(1);
  });
});
