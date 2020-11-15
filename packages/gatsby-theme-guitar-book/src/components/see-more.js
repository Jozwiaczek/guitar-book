import React, { useState } from 'react';
import styled from '@emotion/styled';

import { colors } from '@apollo/space-kit/colors';

const SeeMoreButton = styled.span`
  cursor: pointer;
  font-weight: 500;
  color: ${colors.indigo.dark};
  &:hover {
    color: ${colors.indigo.darker};
  },
`;

const getShortText = (text, limit) => {
  let result = '';
  const words = text.split(/ /);
  for (let i = 0; i < words.length && result.length < limit; i++) {
    result += `${words[i]} `;
  }
  return result;
};

export default function SeeMore({ text, limit }) {
  const [isExpend, setIsExpand] = useState(false);
  if (text.length < limit) return <p>{text}</p>;

  const shortText = getShortText(text, limit);
  return (
    <p>
      {isExpend ? text : shortText}
      <SeeMoreButton onClick={() => setIsExpand((prevState) => !prevState)}>
        {isExpend ? ' See less' : 'See more'}
      </SeeMoreButton>
    </p>
  );
}
