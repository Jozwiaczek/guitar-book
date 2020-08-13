import React from 'react';

export const Verse = ({ text }) => {
  const tmp = text.replace(/ /g, '&nbsp;').split(/\n/);
  const createMarkup = (text) => ({__html: text});

  return (
    <div>
      {tmp.map((line, index) => {
        if (!line && index !== 0 && index !== tmp.length - 1) {
          return <br key={index} />;
        }
        return <p style={{ marginBottom: 0 }} key={index} dangerouslySetInnerHTML={createMarkup(line)}/>;
      })}
      <br/>
      <br/>
    </div>
  );
};
