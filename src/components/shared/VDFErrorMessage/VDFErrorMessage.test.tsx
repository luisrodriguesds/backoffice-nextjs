import React from 'react';
import { configure, mount } from 'enzyme';
import VDFErrorMessage from './VDFErrorMessage';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('VDFErrorMessage', () => {
  it('VDFErrorMessage render itens correctly', () => {
    const wrapper = <VDFErrorMessage errorMessage='Error Message' />;

    const component = mount(wrapper);
    expect(component.find('Error Message'));
  });
  it('VDFErrorMessage render Icon correctly', () => {
    const wrapper = <VDFErrorMessage errorMessage='Error Message' />;

    const component = mount(wrapper);

    expect(component.find('img').html());
  });
});
