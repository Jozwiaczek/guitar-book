import PropTypes from 'prop-types';
import React, { createContext, useContext } from 'react';
import { graphql, navigate } from 'gatsby';

import SEO from '../seo';
import ContentWrapper from '../content-wrapper';
import PageHeader from '../page-header';
import Footer from '../footer';
import PageContent from '../page-content';

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
  const { sidebarContents, githubUrl, twitterHandle, adSense, baseUrl } = props.pageContext;

  const pages = sidebarContents
    .reduce((acc, { pages }) => acc.concat(pages), [])
    .filter((page) => !page.anchor);

  return (
    <>
      <SEO
        title={contentfulAuthor.name}
        description={contentfulAuthor.name || description}
        siteName={title}
        baseUrl={baseUrl}
        twitterHandle={twitterHandle}
        adSense={adSense}
      />
      <ContentWrapper>
        <PageHeader title={contentfulAuthor.name} description={contentfulAuthor.name} />
        <hr />
        <PageContent
          title={contentfulAuthor.name}
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
            <div style={{ whiteSpace: 'break-spaces' }}></div>
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

export const SongTemplateQuery = graphql`
  query SongTemplateQuery($id: String) {
    site {
      pathPrefix
      siteMetadata {
        title
        description
      }
    }
    contentfulAuthor(id: { eq: $id }) {
      avatar {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
