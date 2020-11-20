import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';

import Img from 'gatsby-image';

import styled from '@emotion/styled';

import SEO from '../components/seo';
import ContentWrapper from '../components/content-wrapper';
import PageHeader from '../components/page-header';
import Footer from '../components/footer';
import PageContent from '../components/page-content';
import ListView from '../components/list-view';
import SeeMore from '../components/see-more';
import { getSlug } from '../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  margin-bottom: 1rem;
`;

const DescriptionWrapper = styled.div`
  text-align: justify;
  text-justify: auto;
`;

export default function AuthorTemplate(props) {
  const { hash, pathname } = props.location;
  const { contentfulAuthor, contentfulGlobalSettings, sitePage } = props.data;
  const { siteName, description } = contentfulGlobalSettings;
  const { avatar, name, song: songs, description: authorDescription } = contentfulAuthor;
  const { adSense, baseUrl } = props.pageContext;

  return (
    <>
      <SEO
        title={name}
        description={name || description}
        siteName={siteName}
        baseUrl={baseUrl}
        adSense={adSense}
        image={sitePage.fields.image}
      />
      <ContentWrapper>
        <PageHeader title={name} />
        <hr />
        <PageContent pathname={pathname} hash={hash}>
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
    contentfulGlobalSettings {
      siteName
      description
    }
  }
`;
