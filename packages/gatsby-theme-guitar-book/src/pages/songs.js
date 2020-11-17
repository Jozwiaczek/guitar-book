import React from 'react';
import { graphql } from 'gatsby';

import PageHeader from '../components/page-header';

import ContentWrapper from '../components/content-wrapper';
import ListView from '../components/list-view';

const { getSlug } = require('../utils');

const Songs = ({ data }) => {
  const { nodes } = data.allContentfulSong;
  return (
    <ContentWrapper>
      <PageHeader title="All songs" />
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

export default Songs;

export const query = graphql`
  {
    allContentfulSong(sort: { fields: title, order: ASC }) {
      nodes {
        title
        author {
          name
        }
      }
    }
  }
`;
