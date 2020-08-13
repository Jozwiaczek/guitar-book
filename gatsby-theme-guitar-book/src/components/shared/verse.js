import React from 'react';
import ChordPreview from "../chordPreview";

export const Verse = ({ text }) => {
  const tmp = text.replace(/ /g, '&nbsp;').split(/\n/);
  const createMarkup = (text) => ({__html: text});

  return (
    <div>
      {tmp.map((line, index) => {
        if (!line && index !== 0 && index !== tmp.length - 1) {
          return <br key={index} />;
        }

        let words = line.split("&nbsp;").filter(w => !!w && !w.match(/^[A-Ha-h]m?$/)).length;
        if(!words){
          if (index ===0 || index === tmp.length -1) return null;

          line = line.split("&nbsp;").map(c => {
            if (c.match(/^[A-Ha-h]m?$/)) {
              return c;
            }
            return '';
          });

          return (
            <div key={index}>
              {line.map((item, lineIndex) => {
                if (item === "") return <span key={lineIndex}>&ensp;</span>;
                return <ChordPreview key={lineIndex}>{item}</ChordPreview>;
              })}
            </div>
          );
        }

        return <p style={{ marginBottom: 0 }} key={index} dangerouslySetInnerHTML={createMarkup(line)}/>;
      })}
    </div>
  );
};
