import React from 'react';
import { graphql } from 'gatsby';

import ListView from '../components/list-view';
import CustomPageBase from '../components/base/custom-page-base';

const { getSlug } = require('../utils/helpers');

const RecentlyAddedSongs = ({ data, uri }) => {
  const { nodes } = data.allContentfulSong;
  return (
    <CustomPageBase title="Recently added songs 🆕" description="Discover last 20 songs." uri={uri}>
      <ListView
        items={nodes.map(({ title, author }, index) => ({
          title: `${index + 1}. ${title}`,
          path: getSlug(author.name, title),
        }))}
      />
    </CustomPageBase>
  );
};

export default RecentlyAddedSongs;

export const query = graphql`
  {
    allContentfulSong(limit: 20, sort: { fields: createdAt, order: DESC }) {
      nodes {
        title
        createdAt
        author {
          name
        }
      }
    }
  }
`;
