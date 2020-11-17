import React from 'react';
import { graphql } from 'gatsby';

import PageHeader from '../components/page-header';

import ContentWrapper from '../components/content-wrapper';
import ListView from '../components/list-view';

const { getSlug } = require('../utils');

const Favourites = ({ data }) => {
  const { nodes } = data.allContentfulSong;
  return (
    <ContentWrapper>
      <PageHeader
        title="Favourites songs ⭐️"
        description="Discover all songs marked by author of this Guitar Book as favourite."
      />
      <hr />
      <ListView
        items={nodes.map(({ title, author }, index) => ({
          title: `${index + 1}. ${title}`,
          path: getSlug(author.name, title),
        }))}
      />
    </ContentWrapper>
  );
};

export default Favourites;

export const query = graphql`
  {
    allContentfulSong(sort: { fields: title, order: ASC }, filter: { favourite: { eq: true } }) {
      nodes {
        title
        author {
          name
        }
      }
    }
  }
`;
