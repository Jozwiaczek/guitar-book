import React from 'react';
import { graphql } from 'gatsby';

import ListView from '../components/list-view';
import PageBase from '../components/page-base';

const { getSlug } = require('../utils/helpers');

const RecentlyAddedSongs = ({ data }) => {
  const { nodes } = data.allContentfulSong;
  return (
    <PageBase title="Recently added songs 🆕" description="Discover last 20 songs.">
      <ListView
        items={nodes.map(({ title, author }, index) => ({
          title: `${index + 1}. ${title}`,
          path: getSlug(author.name, title),
        }))}
      />
    </PageBase>
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
