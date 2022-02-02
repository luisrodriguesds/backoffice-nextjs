import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ProductCatalogueSortedTables from './ProductCatalogueSortedTables';
import * as reactRedux from 'react-redux';

describe('ProductCatalogue', () => {
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
        category: 'complete_control',
        products: [
          {
            productId: '6047816c8b981984295ee338',
            priorityOrder: 1,
          },
          {
            productId: '617a702054643519d264295c',
            priorityOrder: 2,
          },
          {
            productId: '1e34364364b241fba07fd432',
            priorityOrder: 3,
          },
          {
            productId: '5e296fb993376774b0ed1f71',
            priorityOrder: 4,
          },
        ],
      },
      {
        category: 'data_plan_only',
        products: [
          {
            productId: '5b0f89944f05a80001e1696b',
            priorityOrder: 1,
          },
          {
            productId: '5b167d4f4f05a800015a03aa',
            priorityOrder: 2,
          },
          {
            productId: '5b1698e94f05a80001201056',
            priorityOrder: 3,
          },
          {
            productId: '5b1fb3c4cbff2700015b1130',
            priorityOrder: 4,
          },
          {
            productId: 'ba10c1a7434644ff9ca3cea1',
            priorityOrder: 5,
          },
        ],
      },
    ];
    useDispatchMock.mockReturnValue(dummyDispatch);
    useSelectorMock.mockReturnValue(dummySelector);

    let wrapper;
    wrapper = render(<ProductCatalogueSortedTables />);

    expect(wrapper);
  });
});
