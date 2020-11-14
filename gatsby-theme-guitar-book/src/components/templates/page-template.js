import PropTypes from 'prop-types';
import React, { createContext, useContext } from 'react';
import { graphql, navigate } from 'gatsby';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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

export default function PageTemplate(props) {
  const { hash, pathname } = props.location;
  const { site, contentfulPage } = props.data;
  const { title, description } = site.siteMetadata;
  const { sidebarContents, githubUrl, twitterHandle, adSense, baseUrl } = props.pageContext;

  const pages = sidebarContents
    .reduce((acc, { pages }) => acc.concat(pages), [])
    .filter((page) => !page.anchor);

  return (
    <>
      <SEO
        title={contentfulPage.title}
        description={contentfulPage.description || description}
        siteName={title}
        baseUrl={baseUrl}
        twitterHandle={twitterHandle}
        adSense={adSense}
      />
      <ContentWrapper>
        <PageHeader title={contentfulPage.title} description={contentfulPage.description} />
        <PageContent
          title={contentfulPage.title}
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
              {documentToReactComponents(contentfulPage.body.json)}
            </div>
          </CustomLinkContext.Provider>
        </PageContent>
        <Footer />
      </ContentWrapper>
    </>
  );
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const PageTemplateQuery = graphql`
  query PageTemplateQuery($id: String) {
    site {
      pathPrefix
      siteMetadata {
        title
        description
      }
    }
    contentfulPage(id: { eq: $id }) {
      body {
        json
      }
      title
      description
    }
  }
`;
