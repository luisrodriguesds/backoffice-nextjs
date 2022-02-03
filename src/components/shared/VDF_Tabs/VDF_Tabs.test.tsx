import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import VDF_Tabs from './VDF_Tabs';

describe('VDF_Tabs', () => {
  const opcos = () => <p>Opco</p>;
  const ImageAndAvatar = () => <p>ImageAndAvatar</p>;
  const deviceUID = () => <p>deviceUID</p>;
  const deviceSharing = () => <p>deviceSharing</p>;

  it('should render correctly', () => {
    render(
      <VDF_Tabs
        tabTitle={['Opcos', 'Images and Avatar', 'Device UID Input Options', 'Device Sharing']}
        tabContent={[opcos, ImageAndAvatar, deviceUID, deviceSharing]}
        setValue={() => {}}
        value={0}
      />
    );
    expect(screen.getByText('Opcos')).toBeInTheDocument();
  });
});
