import React from 'react';

// const Wrapper = styled.div({
//   width: '100%',
//   height: '100%',
//   backgroundColor: transparentize(0.5, colors.text2),
//   overflow: 'auto',
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   zIndex: 3,
//   perspective: '1000px',
//   transitionProperty: 'opacity, visibility',
//   transitionDuration: '150ms',
//   transitionTimingFunction: 'ease-in-out'
// });
//
// const transitionDuration = 150; // in ms
// const Menu = styled.div({
//   width: 700,
//   marginBottom: 24,
//   borderRadius: 4,
//   boxShadow,
//   backgroundColor: 'white',
//   overflow: 'hidden',
//   position: 'absolute',
//   transformOrigin: '25% 25%',
//   transition: `transform ${transitionDuration}ms ease-in-out`,
//   outline: 'none',
//   [breakpoints.md]: {
//     width: 450
//   },
//   [breakpoints.sm]: {
//     width: 'calc(100vw - 48px)'
//   }
// });
//
// const MenuTitle = styled.h6(smallCaps, {
//   margin: 24,
//   marginBottom: 0,
//   fontSize: 13,
//   fontWeight: 600,
//   color: colors.text3
// });

const ChordPreview = ({ children }) => {
  const [isHover, setHover] = React.useState(false);
  const handleMouseHover = () => {
    setHover(prev => !prev);
  };

  return (
    <span
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
    >
      {children}
      {isHover && <p>Test</p>}
    </span>
  );
};

export default ChordPreview;
