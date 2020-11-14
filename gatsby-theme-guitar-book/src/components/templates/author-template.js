import PropTypes from 'prop-types';
import React, { createContext, useContext } from 'react';
import { graphql, navigate } from 'gatsby';

import Img from 'gatsby-image';

import SEO from '../seo';
import ContentWrapper from '../content-wrapper';
import PageHeader from '../page-header';
import Footer from '../footer';
import PageContent from '../page-content';
import { getSlug } from '../../utils/getSlug';
import ListView from '../list-view';

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

export default function AuthorTemplate(props) {
  const { hash, pathname } = props.location;
  const { site, contentfulAuthor } = props.data;
  const { title, description } = site.siteMetadata;
  const { avatar, name, song: songs } = contentfulAuthor;
  const { sidebarContents, githubUrl, twitterHandle, adSense, baseUrl } = props.pageContext;

  const pages = sidebarContents
    .reduce((acc, { pages }) => acc.concat(pages), [])
    .filter((page) => !page.anchor);

  return (
    <>
      <SEO
        title={name}
        description={name || description}
        siteName={title}
        baseUrl={baseUrl}
        twitterHandle={twitterHandle}
        adSense={adSense}
      />
      <ContentWrapper>
        <PageHeader title={name} description="Author" />
        <hr />
        <PageContent pathname={pathname} pages={pages} hash={hash} githubUrl={githubUrl}>
          <div style={{ width: '100%' }} />
          {avatar && <Img fluid={avatar.fluid} style={{ maxWidth: '600px' }} />}
          {songs && (
            <ListView
              title="Song list"
              items={songs.map(({ title }) => ({ title, path: getSlug(name, title) }))}
            />
          )}
          <CustomLinkContext.Provider
            value={{
              pathPrefix: site.pathPrefix,
              baseUrl,
            }}
          >
            <div style={{ whiteSpace: 'break-spaces' }} />
          </CustomLinkContext.Provider>
        </PageContent>
        <Footer />
      </ContentWrapper>
    </>
  );
}

AuthorTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const AuthorTemplateQuery = graphql`
  query AuthorTemplateQuery($id: String) {
    site {
      pathPrefix
      siteMetadata {
        title
        description
      }
    }
    contentfulAuthor(id: { eq: $id }) {
      name
      avatar {
        fluid(maxHeight: 250, quality: 100) {
          ...GatsbyContentfulFluid
        }
      }
      song {
        title
      }
    }
  }
`;
