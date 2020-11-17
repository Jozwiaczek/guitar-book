import React from 'react';
import { graphql } from 'gatsby';

import PageHeader from '../components/page-header';
import { getSlug } from '../utils/getSlug';
import ContentWrapper from '../components/content-wrapper';
import ListView from '../components/list-view';

const { getSidebarContent } = require('../utils/sidebar');

const RecentlyAddedSongs = ({ data }) => {
  const { nodes } = data.allContentfulSong;
  const sidebarContents = getSidebarContent(data.allContentfulSidebar.edges);
  console.log(sidebarContents);
  return (
    <ContentWrapper>
      <PageHeader title="Recently added songs" />
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
