import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductCatalogueOpco from './ProductCatalogueOpco';
import * as reactRedux from 'react-redux';
import mockOpcoList from '../../../../__mocks__/ProductForm/ProductFormPage/mockOpcoList.json';
import mockProductsCatalogueByCountry from '../../../../__mocks__/ProductsCatalogue/mockProductsCatalogueByCountry.json';
import { act } from 'react-dom/test-utils';

const wait = (amount = 0) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

jest.mock('sdk', () => {
  return {
    OpcoService: {
      getOpco: async () => {
        return mockOpcoList;
      },
    },
    ProductCatalogueServices: {
      getProductCatalogueByCountry: async (countryCode: string) => {
        return mockProductsCatalogueByCountry;
      },
    },
  };
});

const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

describe('ProductCatalogue', () => {
  beforeEach(() => {
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    useDispatchMock.mockClear();
  });

  afterEach(() => {
    useDispatchMock.mockClear();
  });

  it('loads data on init', async () => {
    render(<ProductCatalogueOpco />);
    await actWait(500);
    expect(screen.getAllByText('Select Opco')[0]).toBeInTheDocument();
  });

  it('should select country', async () => {
    const { container } = render(<ProductCatalogueOpco />);
    await actWait(500);

    const inputText = container.querySelector('#Country');

    fireEvent.click(inputText as Element);

    await actWait(500);

    fireEvent.change(inputText as Element, { target: { value: 'germany' } });

    fireEvent.click(screen.getByText('Germany'));

    await actWait(500);

    expect(screen.getByDisplayValue('Germany')).toBeInTheDocument();
  });
});
