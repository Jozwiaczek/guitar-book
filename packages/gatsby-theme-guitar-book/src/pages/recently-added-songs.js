import React from 'react';
import { graphql } from 'gatsby';

import PageHeader from '../components/page-header';

import ContentWrapper from '../components/content-wrapper';
import ListView from '../components/list-view';

const { getSlug } = require('../utils');

const RecentlyAddedSongs = ({ data }) => {
  const { nodes } = data.allContentfulSong;
  return (
    <ContentWrapper>
      <PageHeader title="Recently added songs 🆕" description="Discover last 20 songs." />
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
