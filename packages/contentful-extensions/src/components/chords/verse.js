import React from 'react';

import ChordTooltip from './chordTooltip';

export const Verse = ({ text, setAllChords }) => {
  const SPACE_CODE = ' ';
  const lines = text.replace(/ /g, SPACE_CODE).split(/\n/);
  const createMarkup = (text) => ({ __html: text });
  const chordRegEx = /^[A-Ha-h][mb#74]?(add9)?(m7)?(maj7)?(sus)?(sus4)?(is)?$/;

  const renderChords = (chordsLine) => {
    const chords = chordsLine.split(/\s/);
    return (
      <b>
        {chords.map((item, lineIndex) => {
          if (!item) return <React.Fragment key={lineIndex}> </React.Fragment>;
          if (setAllChords) setAllChords((prev) => (prev.includes(item) ? prev : [...prev, item]));
          return (
            <React.Fragment key={lineIndex}>
              <ChordTooltip>{item}</ChordTooltip>{' '}
            </React.Fragment>
          );
        })}
      </b>
    );
  };

  const renderText = (line) => (
    <span style={{ marginBottom: 0 }} dangerouslySetInnerHTML={createMarkup(line)} />
  );

  return lines.map((line, index) => {
    const wordsCount = line.split(/\s/).filter((w) => !!w && !w.match(chordRegEx)).length;
    return (
      <React.Fragment key={index}>
        {wordsCount ? renderText(line) : renderChords(line)}
        <br />
      </React.Fragment>
    );
  });
};
