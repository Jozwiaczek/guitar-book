import React, { useState } from 'react';
import styled from '@emotion/styled';

import { colors } from '@apollo/space-kit/colors';

import { getTextWithLimit } from '../utils/helpers';

const SeeMoreButton = styled.span`
  cursor: pointer;
  font-weight: 500;
  color: ${colors.indigo.dark};
  &:hover {
    color: ${colors.indigo.darker};
  },
`;

export default function SeeMore({ text, limit }) {
  const [isExpend, setIsExpand] = useState(false);
  if (text.length < limit) return <p>{text}</p>;

  const shortText = getTextWithLimit(text, limit);
  return (
    <p>
      {isExpend ? text : shortText}
      <SeeMoreButton onClick={() => setIsExpand((prevState) => !prevState)}>
        {isExpend ? ' See less' : ' See more'}
      </SeeMoreButton>
    </p>
  );
}
