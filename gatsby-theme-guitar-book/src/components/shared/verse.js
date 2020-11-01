import React from 'react';

import ChordPreview from '../chordPreview';
import { AllChordsPreview } from '../allChordsPreview';

export const Verse = ({ text, setAllChords }) => {
  const SPACE_CODE = ' ';
  const lines = text.replace(/ /g, SPACE_CODE).split(/\n/);
  const createMarkup = (text) => ({ __html: text });
  const chordRegEx = /^[A-Ha-h][mb#74]?(add9)?(m7)?(maj7)?(sus)?(sus4)?(is)?$/;

  return (
    <>
      {lines.map((line, index) => {
        if (!line || !line.length) {
          return line;
        }

        const wordsCount = line.split(SPACE_CODE).filter((w) => !!w && !w.match(chordRegEx)).length;
        if (!wordsCount) {
          line = line.split(SPACE_CODE);

          return (
            <span key={index}>
              {line.map((item, lineIndex) => {
                if (item === '') return <span key={lineIndex}> </span>;
                setAllChords((prev) => (prev.includes(item) ? prev : [...prev, item]));
                return (
                  <span key={lineIndex}>
                    <ChordPreview>{item}</ChordPreview>{' '}
                  </span>
                );
              })}
              {lines.length > 1 && <br />}
            </span>
          );
        }
        return (
          <React.Fragment key={index}>
            {/* eslint-disable-next-line react/no-danger */}
            <span
              style={{ marginBottom: 0 }}
              key={index}
              dangerouslySetInnerHTML={createMarkup(line)}
            />
            {lines.length > 1 && !(index === lines.length - 1) && <br />}
          </React.Fragment>
        );
      })}
    </>
  );
};
