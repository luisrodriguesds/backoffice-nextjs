import React from 'react';
import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import ProductCataloguePage from './ProductCataloguePage';
import * as reactRedux from 'react-redux';
import { mockProductsList, mockCatalogue } from '../../../__mocks__/ProductCatalogue/ProductCataloguePage';
import mockOpcoList from '../../../../__mocks__/ProductForm/ProductFormPage/mockOpcoList.json';

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
    ProductsServices: {
      getProducts: async () => {
        return { data: mockProductsList };
      },
    },
    ProductCatalogueServices: {
      getProductDeletedById: async (id: string) => {
        return { data: mockProductsList };
      },
    },
    OpcoService: {
      getOpco: async () => {
        return mockOpcoList;
      },
    },
  };
});

describe('ProductCatalogue', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  const mockStore = {
    productCatalogue: {
      catalogue: { ...mockCatalogue },
    },
  };

  const mockSelectors = (selector: any, store: any) => {
    return selector(store);
  };

  beforeEach(() => {
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    useSelectorMock.mockImplementation((selector) => mockSelectors(selector, mockStore));
  });

  afterEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  const permissionsList = ['CREATE_TOC', 'UPDATE_TOC'];

  it('loads data on init', async () => {
    const wrapper = render(<ProductCataloguePage permissionsList={permissionsList} />);

    await actWait(500);

    expect(wrapper);
  });
});
