import { beforeAll, it } from '@jest/globals';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import VDFToast from './VDFToast';
import { createShallow, createMount } from '@mui/material/test-utils';

configure({ adapter: new Adapter() });

let props = {
  text: 'This is a test',
  type: 'success',
};

describe('<VDFToast /> rendering', () => {
  let shallow;
  let mount;
  let useEffect;
  let wrapper;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  beforeAll(() => {
    shallow = createShallow();
    mount = createMount();
  });

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect(); // 2 times
    mockUseEffect(); //
  });

  it('should render properly', () => {
    wrapper = shallow(<VDFToast {...props} />);
  });

  it('should show the correct message', () => {
    wrapper = shallow(<VDFToast {...props} />);
    expect(wrapper.find('h3').html()).toContain(props.text);
  });

  it('should render a close button when the closeButton prop is passed', () => {
    props = {
      text: 'This is a test',
      type: 'success',
      closeButton: true,
      onClose: () => {
        return;
      },
    };
    wrapper = shallow(<VDFToast {...props} />);
    expect(wrapper.find('img')).toHaveLength(2);
  });
});
