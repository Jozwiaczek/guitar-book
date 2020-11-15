import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Button } from '@apollo/space-kit/Button';

import { IconRun } from '@apollo/space-kit/icons/IconRun';
import { IconRemove } from '@apollo/space-kit/icons/IconRemove';

import { colors } from '../utils/colors';

const Container = styled.div({
  position: 'fixed',
  bottom: '3vh',
  right: 0,
  width: '100vw',
  display: 'flex',
  justifyContent: 'flex-end',
  paddingRight: '3vw',
});

const Panel = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

const StyledIconRun = styled(IconRun)({
  height: '0.75em',
  marginLeft: '0.5em',
});

const StyledIconRemove = styled(IconRemove)({
  height: '1em',
});

const AutoScroll = () => {
  const [isRun, setIsRun] = useState(false);
  const [moveTime, setMoveTime] = useState(10);

  useEffect(() => {
    let interval = null;
    if (isRun) {
      interval = setInterval(() => {
        const YMove = 1;
        const doc = document.documentElement;
        const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0) + YMove;
        window.scroll({
          top,
          behavior: 'smooth',
        });

        if (doc.scrollTop + window.innerHeight >= doc.scrollHeight) {
          setIsRun(false);
        }
      }, moveTime);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRun, moveTime]);

  const handleStopStart = () => {
    setIsRun((prevState) => !prevState);
  };

  const speedUp = () => {
    if (moveTime >= 10) {
      setMoveTime((prevState) => prevState - 20);
    }
  };

  const slowDown = () => {
    if (moveTime <= 190) {
      setMoveTime((prevState) => prevState + 20);
    }
  };

  const enabledBtnStyle = {
    minWidth: 10,
    width: 50,
    padding: 0,
    marginBottom: 10,
  };

  return (
    <Container>
      <Panel>
        {isRun && (
          <>
            <Button size="large" color="#2d1f66" style={enabledBtnStyle} onClick={slowDown}>
              -
            </Button>
            <Button size="large" color="#311c87" style={enabledBtnStyle} onClick={speedUp}>
              +
            </Button>
          </>
        )}
        <Button
          size="large"
          color={isRun ? '#7156d9' : colors.primary}
          style={isRun ? enabledBtnStyle : { width: 135 }}
          onClick={handleStopStart}
        >
          {isRun ? (
            <StyledIconRemove />
          ) : (
            <>
              Auto Scroll
              <StyledIconRun />
            </>
          )}
        </Button>
      </Panel>
    </Container>
  );
};

export default AutoScroll;
