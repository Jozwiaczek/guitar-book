import React from 'react';

import { graphql, Link, useStaticQuery } from 'gatsby';

import styled from '@emotion/styled';

import { getSlug } from '../../utils';
import { smallCaps } from '../../utils/typography';
import { colors } from '../../utils/colors';
import breakpoints from '../../utils/breakpoints';

const MenuTitle = styled.h6(smallCaps, {
  margin: 24,
  marginBottom: 0,
  fontSize: 13,
  fontWeight: 600,
  color: colors.text3,
});

const BigMenuTitle = styled.h2({
  margin: '24px 0',
});

const StyledNav = styled.nav({
  display: 'flex',
  flexWrap: 'wrap',
  margin: 12,
});

const StyledNavItem = styled(Link)({
  display: 'block',
  width: '50%',
  [breakpoints.md]: {
    width: '100%',
  },
  height: '100%',
  padding: 12,
  borderRadius: 4,
  color: colors.text1,
  textDecoration: 'none',
  backgroundColor: 'transparent',
  transitionProperty: 'color, background-color',
  transitionDuration: '150ms',
  transitionTimingFunction: 'ease-in-out',
  '@media (hover: hover)': {
    ':hover': {
      color: 'white',
      backgroundColor: colors.primary,
      p: {
        color: colors.primaryLight,
      },
    },
  },
});

const NavItemTitle = styled.h4({
  marginBottom: 8,
  fontWeight: 600,
  color: 'inherit',
});

const NavItemDescription = styled.p({
  marginBottom: 0,
  fontSize: 14,
  lineHeight: 1.5,
  color: colors.text3,
  transition: 'color 150ms ease-in-out',
});

const MenuItems = ({ onClose, home, style }) => {
  const {
    allContentfulSong,
    allContentfulAuthor,
    contentfulGlobalSettings,
  } = useStaticQuery(graphql`
    query MenuItemsQuery {
      allContentfulAuthor {
        nodes {
          name
        }
      }
      allContentfulSong {
        nodes {
          title
          author {
            name
          }
        }
      }
      contentfulGlobalSettings {
        menuLabel
      }
    }
  `);

  const { menuLabel } = contentfulGlobalSettings;
  const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
  const randomSong = getRandomItem(allContentfulSong.nodes);
  const randomAuthor = getRandomItem(allContentfulAuthor.nodes);
  const randomSongSlug = getSlug(randomSong.author.name, randomSong.title);
  const randomAuthorSlug = getSlug(randomAuthor.name);

  const NavItem = ({ children, ...rest }) => (
    <StyledNavItem onClick={() => onClose && onClose()} {...rest}>
      {children}
    </StyledNavItem>
  );

  return (
    <div style={style}>
      {home ? <BigMenuTitle>{menuLabel}</BigMenuTitle> : <MenuTitle>{menuLabel}</MenuTitle>}
      <StyledNav>
        <NavItem to="/favourites">
          <NavItemTitle>
            Favourites{' '}
            <span role="img" aria-label="favourites">
              ⭐️
            </span>
          </NavItemTitle>
          <NavItemDescription>Check all songs marks as favourites.</NavItemDescription>
        </NavItem>
        <NavItem to="/recently-added-songs">
          <NavItemTitle>
            Recently added songs{' '}
            <span role="img" aria-label="new songs">
              🆕
            </span>
          </NavItemTitle>
          <NavItemDescription>Checkout last added 20 songs.</NavItemDescription>
        </NavItem>
        <NavItem to="/songs">
          <NavItemTitle>
            All songs{' '}
            <span role="img" aria-label="songs">
              🎶
            </span>
          </NavItemTitle>
          <NavItemDescription>Navigate to the list of all songs.</NavItemDescription>
        </NavItem>
        <NavItem to="/authors">
          <NavItemTitle>
            All authors{' '}
            <span role="img" aria-label="author">
              👨🏻‍🎤
            </span>
          </NavItemTitle>
          <NavItemDescription>Navigate to the list of all authors.</NavItemDescription>
        </NavItem>
        <NavItem to={randomSongSlug}>
          <NavItemTitle>
            Random song{' '}
            <span role="img" aria-label="random">
              🔮
            </span>
          </NavItemTitle>
          <NavItemDescription>Pick and play random song.</NavItemDescription>
        </NavItem>
        <NavItem to={randomAuthorSlug}>
          <NavItemTitle>
            Random author{' '}
            <span role="img" aria-label="random">
              🔮
            </span>
          </NavItemTitle>
          <NavItemDescription>Pick and check random author page.</NavItemDescription>
        </NavItem>
      </StyledNav>
    </div>
  );
};

export default MenuItems;
