import React from 'react';

export const Verse = ({ children, chords, perLine }) => {
  const tmp = children.split(' | ');

  if (!chords) return null;

  return (
    <div>
      {tmp.map((line, index) => (
        <div>
          {line} {chords.slice(index, index + perLine)}
        </div>
      ))}
      <br/>
      <br/>
    </div>
  );
};
