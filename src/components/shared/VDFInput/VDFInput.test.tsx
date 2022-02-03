import React from 'react';
import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import VDFInput from './VDFInput';

const wait = (amount = 0) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

describe('VDFInput', () => {
  it('loads data on init', async () => {
    const wrapper = render(
      <VDFInput
        label=''
        title='Input Title'
        nameInput='appName'
        onChange={() => {}}
        value='value'
        top={true}
        hasValidation
        showErrorMessage={true}
        errorMessage='errorMessage'
      />
    );

    await actWait(500);
    expect(wrapper.getByText('Input Title')).toBeInTheDocument();
    expect(wrapper.getByText('errorMessage')).toBeInTheDocument();
  });
});
