import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import useKey from 'react-use/lib/useKey';
import useWindowSize from 'react-use/lib/useWindowSize';
import { IconTwitter } from '@apollo/space-kit/icons/IconTwitter';
import { IconYoutube } from '@apollo/space-kit/icons/IconYoutube';

import { transparentize } from 'polished';

import { graphql, useStaticQuery } from 'gatsby';

import { ReactComponent as SpotifyLogoIcon } from '../../assets/icons/spotify.svg';
import { ReactComponent as InstagramLogoIcon } from '../../assets/icons/instagram.svg';
import { ReactComponent as SoundcloudLogoIcon } from '../../assets/icons/soundcloud.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/mail.svg';

import { boxShadow } from '../search';
import { colors } from '../../utils/colors';
import breakpoints from '../../utils/breakpoints';
import MenuItems from './menu-items';

const Wrapper = styled.div({
  width: '100%',
  height: '100%',
  backgroundColor: transparentize(0.5, colors.text2),
  overflow: 'auto',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 3,
  perspective: '1000px',
  transitionProperty: 'opacity, visibility',
  transitionDuration: '150ms',
  transitionTimingFunction: 'ease-in-out',
});

const transitionDuration = 150; // in ms
const StyledMenu = styled.div({
  width: 700,
  marginBottom: 24,
  borderRadius: 4,
  boxShadow,
  backgroundColor: 'white',
  overflow: 'hidden',
  position: 'absolute',
  transformOrigin: '25% 25%',
  transition: `transform ${transitionDuration}ms ease-in-out`,
  outline: 'none',
  [breakpoints.md]: {
    width: 450,
  },
  [breakpoints.sm]: {
    width: 'calc(100vw - 48px)',
  },
});

const FooterNav = styled.nav({
  display: 'flex',
  alignItems: 'center',
  padding: '16px 24px',
  backgroundColor: colors.background,
  [breakpoints.md]: {
    display: 'block',
  },
});

const FooterNavItem = styled.a({
  color: colors.text2,
  textDecoration: 'none',
  ':hover': {
    color: colors.text3,
  },
  ':not(:last-child)': {
    marginRight: 24,
  },
});

const SocialLinks = styled.div({
  display: 'flex',
  marginLeft: 'auto',
  [breakpoints.md]: {
    marginTop: 8,
  },
});

const SocialLink = styled.a`
  color: ${colors.text2};
  :hover {
    color: ${({ activeColor }) => activeColor || colors.primary};
  }
  :not(:last-child) {
    margin-right: 24px;
  }
  svg {
    width: 24px;
    height: 24px;
    display: block;
    fill: currentColor;
  }
`;

export default function Menu({ onClose, open, buttonRef }) {
  const menuRef = useRef(null);
  const { width } = useWindowSize();
  useKey('Escape', onClose);

  const { contentfulGlobalSettings } = useStaticQuery(graphql`
    query MenuQuery {
      contentfulGlobalSettings {
        twitterUrl
        youtubeUrl
        contactMail
        instagramUrl
        soundcloudUrl
        spotifyUrl
        menuFooterLabel
        menuFooterLink
      }
    }
  `);

  const {
    twitterUrl,
    youtubeUrl,
    contactMail,
    instagramUrl,
    soundcloudUrl,
    spotifyUrl,
    menuFooterLabel,
    menuFooterLink,
  } = contentfulGlobalSettings;

  useEffect(() => {
    if (open) {
      // focus the menu after it has been transitioned in
      setTimeout(() => {
        menuRef.current.focus();
      }, transitionDuration);
    }
  }, [open]);

  const { current } = buttonRef;
  const menuStyles = useMemo(() => {
    if (!current) {
      return null;
    }

    const { top, left, height } = current.getBoundingClientRect();
    return {
      top: top + height + 2,
      left,
    };
  }, [current, width, open]);

  function handleWrapperClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  const hasSocialUrls = Boolean(
    twitterUrl || youtubeUrl || contactMail || instagramUrl || soundcloudUrl || spotifyUrl,
  );

  return (
    <Wrapper
      style={{
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
      }}
      onClick={handleWrapperClick}
    >
      <StyledMenu
        ref={menuRef}
        tabIndex={-1}
        style={{
          ...menuStyles,
          transform: !open && 'translate3d(0,-24px,-16px) rotate3d(1,0,0.1,8deg)',
        }}
      >
        <MenuItems onClose={onClose} />
        {(menuFooterLabel || hasSocialUrls) && (
          <FooterNav>
            <>
              {menuFooterLabel && (
                <FooterNavItem
                  key={menuFooterLabel}
                  href={menuFooterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {menuFooterLabel}
                </FooterNavItem>
              )}
              {hasSocialUrls && (
                <SocialLinks>
                  {contactMail && (
                    <SocialLink
                      href={`mailto:${contactMail}`}
                      title="Contact mail"
                      target="_blank"
                      activeColor="#4285F4"
                    >
                      <MailIcon />
                    </SocialLink>
                  )}
                  {instagramUrl && (
                    <SocialLink
                      href={instagramUrl}
                      title="Instagram"
                      target="_blank"
                      activeColor="#8a3ab9"
                    >
                      <InstagramLogoIcon />
                    </SocialLink>
                  )}
                  {soundcloudUrl && (
                    <SocialLink
                      href={soundcloudUrl}
                      title="Soundcloud"
                      target="_blank"
                      activeColor="#FF9533"
                    >
                      <SoundcloudLogoIcon />
                    </SocialLink>
                  )}
                  {twitterUrl && (
                    <SocialLink
                      href={twitterUrl}
                      title="Twitter"
                      target="_blank"
                      activeColor="#1DA1F2"
                    >
                      <IconTwitter />
                    </SocialLink>
                  )}
                  {youtubeUrl && (
                    <SocialLink
                      href={youtubeUrl}
                      title="YouTube"
                      target="_blank"
                      activeColor="#FF0000"
                    >
                      <IconYoutube />
                    </SocialLink>
                  )}
                  {spotifyUrl && (
                    <SocialLink
                      href={spotifyUrl}
                      title="Spotify"
                      target="_blank"
                      activeColor="#1DB954"
                    >
                      <SpotifyLogoIcon />
                    </SocialLink>
                  )}
                </SocialLinks>
              )}
            </>
          </FooterNav>
        )}
      </StyledMenu>
    </Wrapper>
  );
}

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  buttonRef: PropTypes.object.isRequired,
};
