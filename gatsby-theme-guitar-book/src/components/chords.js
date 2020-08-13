import React from 'react';
import Chord from '@tombatossals/react-chords/lib/Chord';

const instrument = {
  strings: 6,
  fretsOnChord: 4,
  name: 'Guitar',
  keys: [],
  tunings: {
    standard: ['6', '5', '4', '3', '2', '1']
  }
};
const lite = false;

const G = {
  frets: [3, 2, 0, 0, 3, 3],
  fingers: [2, 1, 0, 0, 3, 4]
};

const C = {
  frets: [0, 3, 2, 0, 1, 0],
  fingers: [0, 3, 2, 0, 1, 0]
};

export const getChord = (chord) => {
  switch (chord) {
    case 'G':
      return (
        <Chord
          chord={G}
          instrument={instrument}
          lite={lite}
        />
      );
    case 'C':
      return (
        <Chord
          chord={C}
          instrument={instrument}
          lite={lite}
        />
      );
    default:
      return <p>There isnt chord in schema</p>;
  }
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
