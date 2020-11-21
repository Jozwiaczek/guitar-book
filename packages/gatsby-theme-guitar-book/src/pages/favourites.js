import React from 'react';
import { graphql } from 'gatsby';

import ListView from '../components/list-view';
import CustomPageBase from '../components/base/custom-page-base';

const { getSlug } = require('../utils/helpers');

const Favourites = ({ data }) => {
  const { nodes } = data.allContentfulSong;
  return (
    <CustomPageBase
      title="Favourites songs ⭐️"
      description="Discover all songs marked by author of this Guitar Book as favourite."
    >
      <ListView
        items={nodes.map(({ title, author }, index) => ({
          title: `${index + 1}. ${title}`,
          path: getSlug(author.name, title),
        }))}
      />
    </CustomPageBase>
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
