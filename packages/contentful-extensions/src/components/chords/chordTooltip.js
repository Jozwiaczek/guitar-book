import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

import { getChord } from './chords';

const ChordTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(20),
    fontWeight: '550',
    border: '1px solid #dadde9',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))(Tooltip);

const ChordPreview = ({ children }) => {
  return (
    <ChordTooltip
      title={
        <>
          {getChord(children)}
          {children}
        </>
      }
    >
      <b>{children}</b>
    </ChordTooltip>
  );
};

export default ChordPreview;
