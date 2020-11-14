import styled from '@emotion/styled';

import breakpoints from '../utils/breakpoints';

export default styled.div({
  padding: '40px 56px 0',
  [breakpoints.md]: {
    padding: '32px 48px',
  },
  [breakpoints.sm]: {
    padding: '24px 32px',
  },
});
