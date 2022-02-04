import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import MenuItem from './MenuItem';

describe('MenuItem', () => {
  it('should render correctly', () => {
    render(
      <MenuItem
        key={0}
        animationClass='dismiss'
        menuText='test'
        menuIcon=''
        routeTo={() => {}}
        setShowText={() => {}}
      />
    );

    expect(screen.queryByText('test')).toBeInTheDocument();
  });

  it('should be active correctly', () => {
    render(
      <MenuItem
        key={0}
        animationClass='menuSelected'
        menuText='test'
        menuIcon=''
        routeTo={() => {}}
        setShowText={() => {}}
      />
    );

    expect(screen.queryByText('test')).toBeInTheDocument();
  });

  it('should click in MenuItem correctly', () => {
    const { container } = render(
      <MenuItem
        key={0}
        animationClass='menuSelected'
        menuText='test'
        menuIcon=''
        routeTo={() => {}}
        setShowText={() => {}}
      />
    );
    fireEvent.click(container.querySelector('img') as Element);
    fireEvent.click(container.querySelector('h1') as Element);
    fireEvent.mouseEnter(container.querySelector('img') as Element);
    fireEvent.mouseEnter(container.querySelector('h1') as Element);

    expect(screen.queryByText('test')).toBeInTheDocument();
  });
});
