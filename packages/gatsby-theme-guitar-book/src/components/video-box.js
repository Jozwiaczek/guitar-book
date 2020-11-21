import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { IconArrowDown } from '@apollo/space-kit/icons/IconArrowDown';
import { IconArrowUp } from '@apollo/space-kit/icons/IconArrowUp';
import { size } from 'polished';
import ReactPlayer from 'react-player';

import { colors } from '../utils/colors';

const Container = styled.div({
  marginBottom: '1.45rem',
  borderLeft: `2px solid ${colors.primary}`,
});

const iconSize = 14;
const iconMargin = 12;
const horizontalPadding = 16;
const StyledButton = styled.button({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: `12px ${horizontalPadding}px`,
  border: 0,
  fontSize: 16,
  color: colors.primary,
  lineHeight: 'calc(5/3)',
  textAlign: 'left',
  background: 'none',
  outline: 'none',
  cursor: 'pointer',
  ':hover': {
    color: '#311c87',
  },
  ':active': {
    color: '#311c87',
  },
  svg: {
    ...size(iconSize),
    marginRight: iconMargin,
  },
});

const Content = styled.div({
  padding: `8px ${iconMargin}px`,
  color: colors.text1,
  p: {
    fontSize: '1rem',
  },
});

export function VideoBox({ videoUrl }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = expanded ? IconArrowUp : IconArrowDown;

  return (
    <Container>
      <StyledButton onClick={() => setExpanded(!expanded)}>
        <Icon />
        Music video
      </StyledButton>
      {expanded && (
        <Content>
          <ReactPlayer playing controls light pip url={videoUrl} />
        </Content>
      )}
    </Container>
  );
}

VideoBox.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};
