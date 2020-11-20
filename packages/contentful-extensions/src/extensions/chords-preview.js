import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

import { Verse } from '../components/chords/verse';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  textarea: {
    resize: 'both',
  },
}));

export default function ChordsPreview({ sdk }) {
  const [value, setValue] = useState(sdk.field.getValue());
  const textAreaRef = useRef(null);
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [parentHeight, setParentHeight] = useState('auto');

  const classes = useStyles();

  const saveValue = (text) => {
    setValue(text);
    sdk.field.setValue(text);
  };

  sdk.window.startAutoResizer();

  const onTextChanged = (e) => {
    const text = e.target.value;
    if (text !== value) {
      saveValue(text);
    }
  };

  return (
    <div>
      <Verse text={value} />
      <TextField
        multiline
        fullWidth
        placeholder="Placeholder"
        variant="outlined"
        inputProps={{ className: classes.textarea }}
        value={value}
        onChange={(e) => onTextChanged(e)}
      />
    </div>
  );
}
