import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ProductCatalogueHistory from './ProductCatalogueHistory';
import * as reactRedux from 'react-redux';

describe('ProductCatalogue-Hist', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it('loads data on init', () => {
    const dummyDispatch = jest.fn();
    const dummySelector = [
      {
        activity: 'update catalogue',
        activityDate: '2020-11-18T17:31:10.514Z',
        email: 'smartlife-test15@ppinternal.vodafone.com',
      },
    ];
    useDispatchMock.mockReturnValue(dummyDispatch);
    useSelectorMock.mockReturnValue(dummySelector);

    let wrapper;
    wrapper = render(<ProductCatalogueHistory />);

    expect(wrapper);
  });
});
