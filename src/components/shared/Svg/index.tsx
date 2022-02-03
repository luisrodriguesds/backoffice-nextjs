import * as React from 'react';
import { ISvgProps } from './configs';

const Svg = ({ link }: ISvgProps) => {
  const style = {
    width: '100%',
    height: '100%',
  };

  return (
    <svg style={style}>
      <use xlinkHref={`#${link}`} href={`#${link}`} />
    </svg>
  );
};

export default Svg;
