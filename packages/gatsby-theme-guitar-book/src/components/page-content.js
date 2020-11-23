import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import useMount from 'react-use/lib/useMount';
import { graphql, useStaticQuery, withPrefix } from 'gatsby';

import SectionNav from './section-nav';
import PageNav from './page-nav';
import { colors } from '../utils/colors';
import breakpoints from '../utils/breakpoints';
import { HEADER_HEIGHT } from '../utils/constants';

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
});

const InnerWrapper = styled.div({
  flexGrow: 1,
  width: 0,
});

const BodyContent = styled.div({
  // style all anchors with an href and no prior classes
  // this helps avoid anchors with names and styled buttons
  'a[href]:not([class])': {
    color: colors.primary,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
    code: {
      color: 'inherit',
    },
  },
  [['h1', 'h2', 'h3', 'h4', 'h5', 'h6']]: {
    code: {
      whiteSpace: 'normal',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      ':hover': {
        color: colors.text2,
      },
    },
  },
  '*:not(style) +': {
    [['h3', 'h4']]: {
      marginTop: 56,
    },
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    margin: '0 auto',
  },
  '.mermaid svg': {
    maxWidth: '100%',
  },
});

const Aside = styled.aside({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  width: 240,
  maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  marginTop: -36,
  padding: '40px 0',
  marginLeft: 40,
  position: 'sticky',
  top: HEADER_HEIGHT,
  [breakpoints.lg]: {
    display: 'none',
  },
  [breakpoints.md]: {
    display: 'block',
  },
  [breakpoints.sm]: {
    display: 'none',
  },
});

const AsideHeading = styled.h4({
  fontWeight: 600,
});

export default function PageContent(props) {
  const { contentfulGlobalSettings } = useStaticQuery(graphql`
    query SectionNavQuery {
      contentfulGlobalSettings {
        menuLabel
      }
    }
  `);
  const contentRef = useRef(null);
  const [imagesToLoad, setImagesToLoad] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useMount(() => {
    if (props.hash) {
      // turn numbers at the beginning of the hash to unicode
      // see https://stackoverflow.com/a/20306237/8190832
      const hash = props.hash.toLowerCase().replace(/^#(\d)/, '#\\3$1 ');
      try {
        const hashElement = contentRef.current.querySelector(hash);
        if (hashElement) {
          hashElement.scrollIntoView();
        }
      } catch (error) {
        // let errors pass
      }
    }

    let toLoad = 0;
    const images = contentRef.current.querySelectorAll('img');
    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener('load', handleImageLoad);
        toLoad++;
      }
    });

    setImagesToLoad(toLoad);
  });

  function handleImageLoad() {
    setImagesLoaded((prevImagesLoaded) => prevImagesLoaded + 1);
  }

  const pageIndex = props.pages?.findIndex((page) => {
    const prefixedPath = withPrefix(page.path);
    return prefixedPath === props.pathname || prefixedPath.replace(/\/$/, '') === props.pathname;
  });

  return (
    <Wrapper>
      <InnerWrapper>
        <BodyContent ref={contentRef} className="content-wrapper">
          {props.children}
        </BodyContent>
        {props.pages && (
          <PageNav prevPage={props.pages[pageIndex - 1]} nextPage={props.pages[pageIndex + 1]} />
        )}
      </InnerWrapper>
      {(props.title || props.headings?.length) && (
        <Aside>
          {props.title && <AsideHeading>{props.title}</AsideHeading>}
          {props.headings?.length && (
            <SectionNav
              menuLabel={contentfulGlobalSettings.menuLabel || 'Menu'}
              isHome={props.pathname === '/'}
              headings={props.headings}
              contentRef={contentRef}
              imagesLoaded={imagesLoaded === imagesToLoad}
            />
          )}
        </Aside>
      )}
    </Wrapper>
  );
}

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired,
  pages: PropTypes.array.isRequired,
  hash: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  headings: PropTypes.array.isRequired,
};
