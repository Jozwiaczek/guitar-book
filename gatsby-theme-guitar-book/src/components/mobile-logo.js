import React from 'react';

import { ReactComponent as MobileLogoIcon } from '../assets/mobile-logo.svg';

export const MobileLogo = () => {
  return (
    <MobileLogoIcon
      onClick={() =>
        (window.location = 'https://apps.apple.com/pl/app/guitartuna-guitar-bass-tuner/id527588389')
      }
    />
  );
};
