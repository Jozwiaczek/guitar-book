import PropTypes from 'prop-types';
import React, { createContext, useContext } from 'react';
import { graphql, navigate } from 'gatsby';
import Slugger from 'github-slugger';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { BLOCKS } from '@contentful/rich-text-types';

import striptags from 'striptags';

import styled from '@emotion/styled';

import Img from 'gatsby-image';

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

export default function PageTemplate(props) {
  const { hash, pathname } = props.location;
  const { site, contentfulPage, sitePage } = props.data;
  const { title, description } = site.siteMetadata;
  const { sidebarContents, twitterHandle, adSense, baseUrl } = props.pageContext;

  const pages = sidebarContents
    ?.reduce((acc, { pages }) => acc.concat(pages), [])
    .filter((page) => !page.anchor);

  const headings = contentfulPage.body.json.content.map(({ nodeType, content }) => {
    if (['heading-1', 'heading-2'].includes(nodeType)) {
      return content[0].value;
    }
  });

  const getAnchorSlug = (value) => {
    const text = striptags(value);
    const slugger = new Slugger();
    return slugger.slug(text);
  };

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1 id={getAnchorSlug(children[0])}>{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 id={getAnchorSlug(children[0])}>{children}</h2>,
    },
  };

  return (
    <>
      <SEO
        title={contentfulPage.title}
        description={contentfulPage.description || description}
        siteName={title}
        baseUrl={baseUrl}
        twitterHandle={twitterHandle}
        adSense={adSense}
        image={sitePage.fields.image}
      />
      <ContentWrapper>
        <PageHeader title={contentfulPage.title} description={contentfulPage.description} />
        <PageContent
          title={contentfulPage.title}
          pathname={pathname}
          pages={pages}
          hash={hash}
          headings={headings}
        >
          <CustomLinkContext.Provider
            value={{
              pathPrefix: site.pathPrefix,
              baseUrl,
            }}
          >
            {contentfulPage.image && (
              <Img
                fluid={contentfulPage.image.fluid}
                style={{
                  height: 'auto',
                  maxHeight: '400px',
                  width: '80%',
                  margin: '26px 0',
                }}
                imgStyle={{
                  objectFit: 'cover',
                  borderRadius: 10,
                }}
              />
            )}
            <Wrapper style={{ whiteSpace: 'break-spaces' }}>
              {documentToReactComponents(contentfulPage.body.json, options)}
            </Wrapper>
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
    sitePage(fields: { id: { eq: $id } }) {
      fields {
        image
      }
    }
    contentfulPage(id: { eq: $id }) {
      body {
        json
      }
      title
      description
      image {
        fluid(maxHeight: 400, quality: 100) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`;
