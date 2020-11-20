import React from 'react';
import { Tooltip, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { jsx, css } from '@emotion/react';

import { getChord } from './chords';

// TODO
// const color = colors.background;

const TooltipBodyStyle = css`
  display: none;
  position: absolute;
  left: -8px;
  bottom: -13px;
  transform: translateY(100%);
  width: 284px;
  padding: 19px 16px 12px;
  border-radius: 4px;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 9px;
    width: 0;
    height: 0;
    transform: translateY(-100%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
`;

// const TooltipWrapperStyle = css`
//   position: relative;
//
//   &:hover ${TooltipBody} {
//     display: block;
//   }
// `;

const ChordPreview = ({ children }) => {
  return (
    // <TooltipWrapper>
    { children }
    // <TooltipBody>{getChord(children)}</TooltipBody>
    // </TooltipWrapper>
  );
};

export default ChordPreview;
