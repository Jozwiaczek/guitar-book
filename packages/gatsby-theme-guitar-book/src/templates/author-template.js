import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';

import ListView from '../components/list-view';
import SeeMore from '../components/see-more';
import { getSlug, getTextWithLimit } from '../utils/helpers';
import BaseTemplate from './base-template';

const AboutAuthor = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  margin-bottom: 1rem;
`;

const Description = styled.div`
  text-align: justify;
  text-justify: auto;
`;

export default function AuthorTemplate({ location, data, pageContext }) {
  const { contentfulAuthor } = data;
  const { avatar, name, song, description } = contentfulAuthor;

  return (
    <BaseTemplate
      data={data}
      location={location}
      title={name}
      description={getTextWithLimit(description.description, 70)}
      pageContext={pageContext}
    >
      <AboutAuthor>
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
        {description && (
          <Description>
            <SeeMore text={description.description} limit={1000} />
          </Description>
        )}
      </AboutAuthor>
      {song && (
        <ListView
          title="Song list"
          items={song.map(({ title }) => ({ title, path: getSlug(name, title) }))}
        />
      )}
    </BaseTemplate>
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
    }
  }
`;
