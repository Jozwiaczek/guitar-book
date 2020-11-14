import React from 'react';
import styled from '@emotion/styled';

import { ReactComponent as GuitarBookIcon } from '../assets/GuitarBookIcon.svg';

const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  fontSize: 24,
});

const StyledGuitarBookIcon = styled(GuitarBookIcon)({
  height: '2.5em',
});

export default function Logo() {
  return (
    <Wrapper>
      <StyledGuitarBookIcon />
    </Wrapper>
  );
}
