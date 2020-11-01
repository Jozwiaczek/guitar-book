import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import { graphql, navigate } from 'gatsby';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { BLOCKS, MARKS } from '@contentful/rich-text-types';

import SEO from './seo';
import ContentWrapper from './content-wrapper';
import PageHeader from './page-header';
import Footer from './footer';
import PageContent from './page-content';
import { VideoBox } from './videoBox';
import { Verse } from './shared/verse';

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

export default function Template(props) {
  const { hash, pathname } = props.location;
  const { site, contentfulSong } = props.data;
  const { title, description } = site.siteMetadata;
  const { sidebarContents, githubUrl, twitterHandle, adSense, baseUrl } = props.pageContext;

  const pages = sidebarContents
    .reduce((acc, { pages }) => acc.concat(pages), [])
    .filter((page) => !page.anchor);

  const options = {
    renderText: (text) => {
      console.log('L:66 | text: ', text);
      return <Verse text={text} />;
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
        <PageHeader />
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
            <div style={{ whiteSpace: 'break-spaces' }}>
              {documentToReactComponents(contentfulSong.lyrics.json, options)}
            </div>
            {/* {file.childMdx ? ( */}
            {/*  <MDXProvider components={components}> */}
            {/*    <MDXRenderer>{file.childMdx.body}</MDXRenderer> */}
            {/*  </MDXProvider> */}
            {/* ) : ( */}
            {/*  renderAst(file.childMarkdownRemark.htmlAst) */}
            {/* )} */}
          </CustomLinkContext.Provider>
        </PageContent>
        <Footer />
      </ContentWrapper>
    </>
  );
}

Template.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query PageQuery($id: String) {
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
    file(id: { eq: $id }) {
      childMarkdownRemark {
        frontmatter {
          title
          description
        }
        headings(depth: h2) {
          value
        }
        fields {
          image
          graphManagerUrl
        }
        htmlAst
      }
      childMdx {
        frontmatter {
          title
          description
          ytLink
        }
        headings(depth: h2) {
          value
        }
        fields {
          image
          graphManagerUrl
        }
        body
      }
    }
  }
`;
