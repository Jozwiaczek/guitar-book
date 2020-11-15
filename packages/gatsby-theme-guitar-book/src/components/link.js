import React from 'react';
import { Link as GLink } from 'gatsby';
import styled from '@emotion/styled';

import { colors } from '../utils/colors';

const CustomLink = styled(GLink)`
  font-size: 1rem;
  line-height: 1.5;
  text-decoration: none;
  color: ${colors.text2};
  &:hover {
    opacity: ${colors.hoverOpacity};
    text-decoration: none;
  }
  &:active {
    color: ${colors.primary};
  }
`;

export default function Link({ to, children }) {
  return <CustomLink to={to}>{children}</CustomLink>;
}
