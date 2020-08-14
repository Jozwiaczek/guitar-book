import React from 'react';
import Chord from '@tombatossals/react-chords/lib/Chord';
import db from '@tombatossals/chords-db/src/db';

const { guitar } = db;

const instrument = {
  ...guitar.main,
  tunings: {
    standard: ['6', '5', '4', '3', '2', '1']
  }
};
const lite = false;

const getChordPositions = (key, suffix = "major") => {
  const chardKey = guitar.chords[key];
  if(!chardKey)
    return null;

  let chord = chardKey.find(c => c.suffix === suffix);
  if(!chord)
    return null;

  return chord.positions;
};

export const getChord = (chordText) => {
  let chordPos;

  chordText = chordText.replace("H", "B").replace("h", "b");

  if (chordText.length === 1) {
    chordPos = (chordText === chordText.toUpperCase()) ?
      getChordPositions(chordText) : getChordPositions(chordText.toUpperCase(), "minor");
  } else if (chordText.endsWith("#") || chordText.endsWith("is")) {
    chordPos = getChordPositions(chordText.charAt(0).toUpperCase() + "sharp");
  } else if (chordText.endsWith("m") || chordText.endsWith("b")) {
    chordPos = getChordPositions(chordText.charAt(0).toUpperCase(), "minor");
  } else if (chordText.endsWith("add9")) {
    chordPos = getChordPositions(chordText.charAt(0).toUpperCase(), "add9");
  } else if (chordText.toLowerCase().endsWith("m7")) {
    chordPos = getChordPositions(chordText.charAt(0).toUpperCase(), "m7");
  } else if (chordText.toLowerCase().endsWith("maj7")){
    chordPos = getChordPositions(chordText.charAt(0).toUpperCase(), "maj7");
  } else if(chordText.endsWith("7")){
    chordPos = getChordPositions(chordText.charAt(0).toUpperCase(), "7");
  } else if(chordText.toLowerCase().endsWith("sus") || chordText.toLowerCase().endsWith("sus4") || chordText.endsWith("4")){
    chordPos = getChordPositions(chordText.charAt(0).toUpperCase(), "sus4");
  }



  if(chordPos) {
    chordPos = chordPos.slice(0, 1);
    return (
      chordPos.map((c, key)=> {
        let { frets, fingers } = c;
        let chord = {
          frets: frets.split("").map(c => {
            let r = parseInt(c);
            return (isNaN(r)) ? 0 : r;
          }),
          fingers: fingers.split("").map(c => parseInt(c)),
          barres: (c.barres)? [c.barres] : undefined,
          capo: (c.capo) ? c.capo : false
        };
        return( <Chord
          key={key}
          chord={chord}
          instrument={instrument}
          lite={lite}
        />);
      })

    );
  }
  return <p>There isn&apos;t chord in schema</p>;
};

// EXAMPLE
// const MyChord = () => {
//   const chord = {
//     frets: [1, 3, 3, 2, 1, 1],
//     fingers: [1, 3, 4, 2, 1, 1],
//     barres: [1],
//     capo: false,
//   };
//   const instrument = {
//     strings: 6,
//     fretsOnChord: 4,
//     name: 'Guitar',
//     keys: [],
//     tunings: {
//       standard: ['6', '5', '4', '3', '2', '1']
//     }
//   };
//   const lite = false;
//   return (
//     <Chord
//       chord={chord}
//       instrument={instrument}
//       lite={lite}
//     />
//   );
// };
