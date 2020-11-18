import React, { useState } from 'react';
import styled from '@emotion/styled';
import { IconFilter } from '@apollo/space-kit/icons/IconFilter';
import { IconHide } from '@apollo/space-kit/icons/IconHide';
import { IconView } from '@apollo/space-kit/icons/IconView';
import { IconOutlink } from '@apollo/space-kit/icons/IconOutlink';
import { colors } from '@apollo/space-kit/colors';
import { Popover } from '@apollo/space-kit/Popover';
import { ListHeading } from '@apollo/space-kit/ListHeading';
import { ListItem } from '@apollo/space-kit/ListItem';

import { graphql, useStaticQuery } from 'gatsby';

import breakpoints from '../utils/breakpoints';
import AutoScroll from './auto-scroll';

const StyledLink = styled.a({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  color: colors.indigo.dark,
  lineHeight: 2,
  textDecoration: 'none',
  ':hover': {
    color: colors.indigo.darker,
  },
});

const StyledIconToolbox = styled(IconFilter)({
  height: '1.25em',
  marginLeft: '0.7em',
});

const StyledIconOutlink = styled(IconOutlink)({
  height: '0.75em',
  marginLeft: '0.5em',
});

const StyledIconShow = styled(IconView)({
  height: '1em',
  marginLeft: '0.5em',
});

const StyledIconHide = styled(IconHide)({
  height: '1em',
  marginLeft: '0.5em',
});

const DesktopText = styled.span({
  [breakpoints.md]: {
    display: 'none',
  },
});

const DesktopLink = styled.a({
  [breakpoints.md]: {
    display: 'none',
  },
});

const MobileLink = styled.a({
  display: 'none',
  [breakpoints.md]: {
    display: 'flex',
  },
});

const LaunchTunerButton = () => {
  const content = (
    <>
      Launch Guitar Tuner
      <StyledIconOutlink weight="thin" />
    </>
  );

  return (
    <>
      <DesktopLink
        href="https://yousician.com/guitartuna"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        {content}
      </DesktopLink>
      <MobileLink
        onClick={() =>
          (window.location =
            'https://apps.apple.com/pl/app/guitartuna-guitar-bass-tuner/id527588389')
        }
      >
        {content}
      </MobileLink>
    </>
  );
};

export default function Toolbox({ pathname }) {
  const [isAutoScrollShown, setAutoScrollOpen] = useState(false);

  const { allSitePage } = useStaticQuery(
    graphql`
      {
        allSitePage(filter: { fields: { isSong: { eq: true } } }) {
          nodes {
            fields {
              slug
            }
          }
        }
      }
    `,
  );

  const isSong = allSitePage.nodes.some((node) => node.fields.slug === pathname);

  return (
    <div>
      <Popover
        placement="bottom"
        popperOptions={{ strategy: 'absolute' }}
        fallbackPlacements={['top']}
        iconSize="small"
        content={
          <>
            <ListHeading>Toolbox</ListHeading>
            {isSong && (
              <ListItem onClick={() => setAutoScrollOpen((prev) => !prev)}>
                {isAutoScrollShown ? (
                  <>
                    Hide Auto Scroll
                    <StyledIconHide />
                  </>
                ) : (
                  <>
                    Show Auto Scroll
                    <StyledIconShow />
                  </>
                )}
              </ListItem>
            )}
            <ListItem>
              <LaunchTunerButton />
            </ListItem>
          </>
        }
        trigger={
          <StyledLink>
            <DesktopText>Open Toolbox</DesktopText>
            <StyledIconToolbox weight="thin" />
          </StyledLink>
        }
      />
      {pathname !== '/' && isAutoScrollShown && <AutoScroll />}
    </div>
  );
}
