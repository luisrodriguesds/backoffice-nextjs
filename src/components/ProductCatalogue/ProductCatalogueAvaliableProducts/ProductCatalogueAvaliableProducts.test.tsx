import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ProductCatalogueAvaliableProducts from './ProductCatalogueAvaliableProducts';
import * as reactRedux from 'react-redux';
import { mockCatalogue } from '../../../__mocks__/ProductCatalogue/ProductCataloguePage';

const mockStore = {
  productCatalogue: {
    catalogue: { ...mockCatalogue },
  },
};

const mockSelectors = (selector: any, store: any) => {
  return selector(store);
};

describe('ProductCatalogue', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    useSelectorMock.mockImplementation((selector) => mockSelectors(selector, mockStore));
  });

  afterEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it('loads data on init', () => {
    let wrapper;
    wrapper = render(<ProductCatalogueAvaliableProducts />);

    expect(wrapper);
  });
});
