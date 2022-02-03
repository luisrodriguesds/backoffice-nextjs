import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import VDF_TableOrdenated from './VDF_TableOrdenated';
import * as reactRedux from 'react-redux';

describe('VDF_TableOrdenated', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  beforeEach(() => {
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);
  });

  afterEach(() => {
    useDispatchMock.mockClear();
  });

  it('should render correctly', () => {
    render(
      <VDF_TableOrdenated
        rows={[{ name: 'name', label: 'label' }]}
        setRows={() => {}}
        content={() => <></>}
        tags={['1']}
        hasTitle={true}
        title={'Title'}
        emptyMessage={'emptyMessage'}
      />
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});
