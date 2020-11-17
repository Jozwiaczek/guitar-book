import PropTypes from 'prop-types';
import React, { createContext, useContext } from 'react';
import { graphql, navigate } from 'gatsby';

import Img from 'gatsby-image';

import styled from '@emotion/styled';

import SEO from '../seo';
import ContentWrapper from '../content-wrapper';
import PageHeader from '../page-header';
import Footer from '../footer';
import PageContent from '../page-content';
import ListView from '../list-view';
import SeeMore from '../see-more';
import { getSlug } from '../../utils';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`;

const DescriptionWrapper = styled.div`
  text-align: justify;
  text-justify: auto;
`;

export default function AuthorTemplate(props) {
  const { hash, pathname } = props.location;
  const { site, contentfulAuthor, sitePage } = props.data;
  const { title, description } = site.siteMetadata;
  const { avatar, name, song: songs, description: authorDescription } = contentfulAuthor;
  const { githubUrl, twitterHandle, adSense, baseUrl } = props.pageContext;

  return (
    <>
      <SEO
        title={name}
        description={name || description}
        siteName={title}
        baseUrl={baseUrl}
        twitterHandle={twitterHandle}
        adSense={adSense}
        image={sitePage.fields.image}
      />
      <ContentWrapper>
        <PageHeader title={name} />
        <hr />
        <PageContent pathname={pathname} hash={hash} githubUrl={githubUrl}>
          <CustomLinkContext.Provider
            value={{
              pathPrefix: site.pathPrefix,
              baseUrl,
            }}
          >
            <Container>
              {avatar && (
                <Img
                  fluid={avatar.fluid}
                  style={{
                    height: 'auto',
                    maxHeight: '400px',
                    width: '100%',
                  }}
                  imgStyle={{
                    objectFit: 'cover',
                    borderRadius: 10,
                  }}
                />
              )}
              {authorDescription && (
                <DescriptionWrapper>
                  <SeeMore text={authorDescription.description} limit={1000} />
                </DescriptionWrapper>
              )}
            </Container>
            {songs && (
              <ListView
                title="Song list"
                items={songs.map(({ title }) => ({ title, path: getSlug(name, title) }))}
              />
            )}
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
    sitePage(fields: { id: { eq: $id } }) {
      fields {
        image
      }
    }
    contentfulAuthor(id: { eq: $id }) {
      name
      description {
        description
      }
      avatar {
        fluid(maxHeight: 400, quality: 100) {
          ...GatsbyContentfulFluid
        }
      }
      song {
        title
      }
    }
  }
`;
