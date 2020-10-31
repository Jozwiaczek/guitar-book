import React from 'react';

import ChordPreview from '../chordPreview';
import { AllChordsPreview } from '../allChordsPreview';

export const Verse = ({ text }) => {
  const tmp = text.replace(/ /g, '&ensp;').split(/\n/);
  const createMarkup = (text) => ({ __html: text });
  const chordRegEx = /^[A-Ha-h][mb#74]?(add9)?(m7)?(maj7)?(sus)?(sus4)?(is)?$/;
  const allChords = [];

  return (
    <div>
      {tmp.map((line, index) => {
        if (!line && index !== 0 && index !== tmp.length - 1) {
          return <br key={index} />;
        }

        const words = line.split(/&ensp;|\//).filter((w) => !!w && !w.match(chordRegEx)).length;
        if (!words) {
          if (index === 0 || index === tmp.length - 1) return null;

          line = line.split(/&ensp;|\//).map((c) => {
            if (c.match(chordRegEx)) {
              return c;
            }
            return '';
          });

          return (
            <div key={index}>
              {line.map((item, lineIndex) => {
                if (item === '') return <span key={lineIndex}>&ensp;</span>;
                allChords.push(item);
                return <ChordPreview key={lineIndex}>{item}</ChordPreview>;
              })}
            </div>
          );
        }

        return (
          // eslint-disable-next-line react/no-danger
          <p style={{ marginBottom: 0 }} key={index} dangerouslySetInnerHTML={createMarkup(line)} />
        );
      })}
      {allChords.length > 0 && <AllChordsPreview chords={Array.from(new Set(allChords))} />}
    </div>
  );
};
