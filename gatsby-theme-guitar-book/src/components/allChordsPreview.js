import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { IconArrowDown } from '@apollo/space-kit/icons/IconArrowDown';
import { IconArrowUp } from '@apollo/space-kit/icons/IconArrowUp';

import { size } from 'polished';

import { colors } from '../utils/colors';
import { getChord } from './chords';

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
  padding: `8px ${horizontalPadding + iconSize + iconMargin}px`,
  color: colors.text1,
  p: {
    fontSize: '1rem',
  },
});

export function AllChordsPreview({ allChords }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = expanded ? IconArrowUp : IconArrowDown;

  return (
    <>
      <hr />
      <Container>
        <StyledButton onClick={() => setExpanded(!expanded)}>
          <Icon />
          Chords
        </StyledButton>
        {expanded && (
          <Content>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              {allChords.map((chord, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: 200,
                      marginBottom: 20,
                    }}
                  >
                    <h3 style={{ marginBottom: 0 }}>{chord}</h3>
                    {getChord(chord)}
                  </div>
                );
              })}
            </div>
          </Content>
        )}
      </Container>
    </>
  );
}

AllChordsPreview.AllChordsPreview = {
  chords: PropTypes.array.isRequired,
};
