import React from 'react';

export const LineWithChords = ({children, chords}) => {
  return (
    <>
      {children} {chords}
      <br/>
      <br/>
    </>
  );
};
