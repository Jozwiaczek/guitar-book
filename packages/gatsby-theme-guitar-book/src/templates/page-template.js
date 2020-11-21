import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import MenuItems from '../components/menu/menu-items';
import BaseTemplate from './base-template';
import HTMLField from '../components/contentfulFields/HTMLField';
import { getHeadingsFromJson } from '../utils/helpers';

export default function PageTemplate({ data, location, pageContext }) {
  const { contentfulPage } = data;
  const { title, description, isHomepage, image, body } = contentfulPage;

  return (
    <BaseTemplate
      data={data}
      location={location}
      title={title}
      description={description}
      pageContext={pageContext}
      headings={getHeadingsFromJson(body.json)}
    >
      {isHomepage && <MenuItems home style={{ marginBottom: 20 }} />}
      {image && (
        <Img
          fluid={image.fluid}
          style={{
            height: 'auto',
            maxHeight: '400px',
            width: '90%',
            margin: '26px 0',
          }}
          imgStyle={{
            objectFit: 'cover',
            borderRadius: 10,
          }}
        />
      )}
      <HTMLField json={body.json} />
    </BaseTemplate>
  );
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const PageTemplateQuery = graphql`
  query PageTemplateQuery($id: String) {
    sitePage(fields: { id: { eq: $id } }) {
      fields {
        image
      }
    }
    contentfulPage(id: { eq: $id }) {
      isHomepage
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
    contentfulGlobalSettings {
      siteName
      description
    }
  }
`;
