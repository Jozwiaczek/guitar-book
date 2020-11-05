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

export default function SongTemplate(props) {
  const { hash, pathname } = props.location;
  const { site, contentfulHomepage } = props.data;
  const { title, description } = site.siteMetadata;
  const { sidebarContents, githubUrl, twitterHandle, adSense, baseUrl } = props.pageContext;

  const pages = sidebarContents
    .reduce((acc, { pages }) => acc.concat(pages), [])
    .filter((page) => !page.anchor);

  return (
    <>
      <SEO
        title={contentfulHomepage.title}
        description={contentfulHomepage.description || description}
        siteName={title}
        baseUrl={baseUrl}
        twitterHandle={twitterHandle}
        adSense={adSense}
      />
      <ContentWrapper>
        <PageHeader title={contentfulHomepage.title} description={contentfulHomepage.description} />
        <PageContent
          title={contentfulHomepage.title}
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
              {documentToReactComponents(contentfulHomepage.welcomeSection.json)}
            </div>
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

export const HomepageTemplateQuery = graphql`
  query HomepageTemplateQuery($id: String) {
    site {
      pathPrefix
      siteMetadata {
        title
        description
      }
    }
    contentfulHomepage(id: { eq: $id }) {
      welcomeSection {
        json
      }
      title
      description
    }
  }
`;
