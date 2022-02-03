import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import IconTableField from './IconTableField';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ProductsServices } from 'sdk';

configure({ adapter: new Adapter() });

const apps = {
  id: '5bead6adc9e77c0001fb8397',
  size: 22.528,
  mimeType: 'image/jpeg',
  md5Hash: 'c02c5a305c629609bb9d1969d2b309c0',
  uploadDate: 1542117037720,
  height: 475,
  width: 464,
};

describe('IconTableField', () => {
  it('IconTableField render 2 itens correctly', () => {
    const wrapper = <IconTableField icon={apps} promisseFunc={ProductsServices.getProductsImages} />;

    const component = mount(wrapper);
    // console.log(component.debug());
    expect(component.find('img'));
  });
  it('IconTableField render 2 itens correctly', () => {
    const wrapper = <IconTableField icon={undefined} promisseFunc={ProductsServices.getProductsImages} />;

    const component = mount(wrapper);
    // console.log(component.debug());
    expect(component.find('img'));
  });
});

// npm run test -f "AppItem"
