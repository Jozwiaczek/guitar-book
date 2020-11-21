import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Typography,
  Paper,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Verse } from '../components/chords/verse';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  textarea: {
    resize: 'none',
  },
  paper: {
    marginBottom: theme.spacing(3),
    backgroundColor: '#f7f9fa',
    padding: theme.spacing(2),
    border: 'solid 1px',
    borderColor: 'rgb(195, 207, 213)',
    width: '100%',
  },
}));

export default function ChordsPreview({ sdk }) {
  const [value, setValue] = useState(sdk.field.getValue());

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
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Preview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={0} className={classes.paper}>
            <div style={{ whiteSpace: 'break-spaces' }}>
              <Typography>
                <Verse text={value} />
              </Typography>
            </div>
          </Paper>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded>
        <AccordionSummary>
          <Typography className={classes.heading}>Lyrics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            multiline
            fullWidth
            placeholder="Placeholder"
            variant="outlined"
            inputProps={{ className: classes.textarea }}
            value={value}
            onChange={(e) => onTextChanged(e)}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
