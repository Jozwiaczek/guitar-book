import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate } from 'gatsby';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import SEO from '../seo';
import ContentWrapper from '../content-wrapper';
import PageHeader from '../page-header';
import Footer from '../footer';
import PageContent from '../page-content';
import { VideoBox } from '../videoBox';
import { Verse } from '../verse';
import { AllChordsPreview } from '../chords/allChordsPreview';
import TestTs from './TestTs';

const CustomLinkContext = createContext({});

const CustomLink = (props) => {
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
};

CustomLink.propTypes = {
  href: PropTypes.string,
};

export default function SongTemplate(props) {
  const { hash, pathname } = props.location;
  const { site, contentfulSong } = props.data;
  const { title, description } = site.siteMetadata;
  const { sidebarContents, githubUrl, twitterHandle, adSense, baseUrl } = props.pageContext;
  const [allChords, setAllChords] = useState([]);
  const pages = sidebarContents.reduce((acc, { items }) => acc.concat(items), []);

  const options = {
    renderText: (text) => {
      return <Verse text={text} setAllChords={setAllChords} />;
    },
  };

  return (
    <>
      <SEO
        title={contentfulSong.title}
        description={contentfulSong.author.name || description}
        siteName={title}
        baseUrl={baseUrl}
        twitterHandle={twitterHandle}
        adSense={adSense}
      />
      <ContentWrapper>
        <PageHeader title={contentfulSong.title} description={contentfulSong.author?.name} />
        <hr />
        {contentfulSong.videoLink && (
          <>
            <VideoBox videoUrl={contentfulSong.videoLink} />
            <hr />
          </>
        )}
        <PageContent
          title={contentfulSong.title}
          pathname={pathname}
          pages={pages}
          hash={hash}
          githubUrl={githubUrl}
        >
          <CustomLinkContext.Provider
            value={{
              pathPrefix: site.pathPrefix,
              baseUrl,
            }}
          >
            <TestTs title="hello ts" />
            <div style={{ whiteSpace: 'break-spaces' }}>
              {documentToReactComponents(contentfulSong.lyrics.json, options)}
            </div>
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
      siteMetadata {
        title
        description
      }
    }
    contentfulSong(id: { eq: $id }) {
      lyrics {
        json
      }
      title
      videoLink
      author {
        name
      }
    }
  }
`;
