import React from 'react';
import styled from "@emotion/styled";
import {getChord} from "./chords";

const TooltipBody = styled.span`
  display: none;
  position: absolute;
  left: -8px;
  bottom: -13px;
  transform: translateY(100%);
  width: 284px;
  padding: 19px 16px 12px;
  background: rgb(237, 238, 255);
  border-radius: 4px;
  font-size: 13px;
  line-height: 18px;
  color: rgb(109, 113, 203);
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 9px;
    width: 0;
    height: 0;
    transform: translateY(-100%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid rgb(237, 238, 255);
  }
`;

const TooltipWrapper = styled.span`
  position: relative;

  &:hover ${TooltipBody} {
    display: block;
  }
`;

const ChordPreview = ({ children }) => {

  return (
    <TooltipWrapper>
      <b>{children}</b>
      <TooltipBody>
        {getChord(children)}
      </TooltipBody>
    </TooltipWrapper>
  );
};

export default ChordPreview;
