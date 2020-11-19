import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import { graphql, Link as GLink, navigate } from 'gatsby';
import Slugger from 'github-slugger';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import styled from '@emotion/styled';

import striptags from 'striptags';

import { BLOCKS } from '@contentful/rich-text-types';

import { Tooltip } from '@apollo/space-kit/Tooltip';

import SEO from '../seo';
import ContentWrapper from '../content-wrapper';
import PageHeader from '../page-header';
import Footer from '../footer';
import PageContent from '../page-content';
import { VideoBox } from '../videoBox';
import { Verse } from '../chords/verse';
import { AllChordsPreview } from '../chords/allChordsPreview';
import { getSlug } from '../../utils';
import { colors } from '../../utils/colors';

const CustomLinkContext = createContext();

function CustomLink(props) {
  const { pathPrefix, baseUrl } = useContext(CustomLinkContext);

  const linkProps = { ...props };
  if (props.href) {
    if (props.href.startsWith('/')) {
      linkProps.onClick = function handleClick(event) {
        const href = event.target.getAttribute('href');
        if (href.startsWith('/')) {
          event.preventDefault();
          navigate(href.replace(pathPrefix, ''));
        }
      };
    } else if (!props.href.startsWith('#') && !props.href.startsWith(baseUrl)) {
      linkProps.target = '_blank';
      linkProps.rel = 'noopener noreferrer';
    }
  }

  return <a {...linkProps} />;
}

CustomLink.propTypes = {
  href: PropTypes.string,
};

const Wrapper = styled.div`
  h1 {
    margin-top: -285px;
    padding-top: 285px;
    display: inline-block;
  }
  h2 {
    margin-top: -229px;
    padding-top: 285px;
    display: inline-block;
  }
`;

const StyledHeader = styled(GLink)`
  font-size: 1.4rem;
  text-decoration: none;
  color: ${colors.primary};
  &:hover {
    opacity: ${colors.hoverOpacity};
    text-decoration: none;
  }
  &:active {
    color: ${colors.text3};
  }
`;

export default function SongTemplate(props) {
  const { hash, pathname } = props.location;
  const { site, contentfulSong, contentfulGlobalSettings, sitePage } = props.data;
  const { siteName, description } = contentfulGlobalSettings;
  const { sidebarContents, adSense, baseUrl } = props.pageContext;
  const [allChords, setAllChords] = useState([]);
  const pages = sidebarContents
    ?.reduce((acc, { pages }) => acc.concat(pages), [])
    .filter((page) => !page.anchor);
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1 id={getAnchorSlug(children[0])}>{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 id={getAnchorSlug(children[0])}>{children}</h2>,
    },
    renderText: (text) => {
      return <Verse text={text} setAllChords={setAllChords} />;
    },
  };

  const headings = contentfulSong.lyrics.json.content.map(({ nodeType, content }) => {
    if (['heading-1', 'heading-2'].includes(nodeType)) {
      return content[0].value;
    }
  });

  const getAnchorSlug = (value) => {
    const text = striptags(value);
    const slugger = new Slugger();
    return slugger.slug(text);
  };

  return (
    <>
      <SEO
        title={contentfulSong.title}
        description={contentfulSong.author.name || description}
        siteName={siteName}
        baseUrl={baseUrl}
        adSense={adSense}
        image={sitePage?.fields?.image}
        headings={headings}
      />
      <ContentWrapper>
        <PageHeader
          title={contentfulSong.title}
          favourite={!!contentfulSong.favourite}
          description={
            <Tooltip content="Show author">
              <StyledHeader to={getSlug(contentfulSong.author.name)}>
                {contentfulSong.author.name}
              </StyledHeader>
            </Tooltip>
          }
        />
        <hr />
        {contentfulSong.videoLink && (
          <>
            <VideoBox videoUrl={contentfulSong.videoLink} />
            <hr />
          </>
        )}
        <PageContent title={contentfulSong.title} pathname={pathname} pages={pages} hash={hash}>
          <CustomLinkContext.Provider
            value={{
              pathPrefix: site.pathPrefix,
              baseUrl,
            }}
          >
            <Wrapper style={{ whiteSpace: 'break-spaces' }}>
              {documentToReactComponents(contentfulSong.lyrics.json, options)}
            </Wrapper>
            {allChords.length && <AllChordsPreview allChords={allChords} />}
          </CustomLinkContext.Provider>
        </PageContent>
        <Footer />
      </ContentWrapper>
    </>
  );
}

SongTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const SongTemplateQuery = graphql`
  query SongTemplateQuery($id: String) {
    site {
      pathPrefix
    }
    sitePage(fields: { id: { eq: $id } }) {
      fields {
        image
      }
    }
    contentfulSong(id: { eq: $id }) {
      lyrics {
        json
      }
      favourite
      title
      videoLink
      author {
        name
      }
    }
    contentfulGlobalSettings {
      siteName
      description
    }
  }
`;
