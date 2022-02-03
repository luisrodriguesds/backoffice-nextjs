import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import CountryTag from './CountryTag';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import mockOpcoList from '../../../../__mocks__/ProductForm/ProductFormPage/mockOpcoList.json';

configure({ adapter: new Adapter() });

describe('CountryTag', () => {
  const opcoList = [mockOpcoList];
  it('CountryTag render ACTIVE correctly', () => {
    const wrapper = <CountryTag country={'BR'} status={'ACTIVE'} opcoList={opcoList} />;

    const component = mount(wrapper);
    // console.log(component.debug());
    expect(component.find('Brasil'));
  });
  it('CountryTag render DESACTICVE correctly', () => {
    const wrapper = <CountryTag country={'BR'} status={'DESACTIVE'} opcoList={opcoList} />;

    const component = mount(wrapper);
    // console.log(component.debug());
    expect(component.find('Brasil'));
  });
  it('CountryTag render NULL correctly', () => {
    const wrapper = <CountryTag country={'BR'} status={'NULL'} opcoList={opcoList} />;

    const component = mount(wrapper);
    // console.log(component.debug());
    expect(component.find('Brasil'));
  });
});

// npm run test -f "AppItem"
