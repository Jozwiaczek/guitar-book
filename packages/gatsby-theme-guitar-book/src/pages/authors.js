import React from 'react';
import { graphql } from 'gatsby';

import PageHeader from '../components/page-header';

import ContentWrapper from '../components/content-wrapper';
import ListView from '../components/list-view';

const { getSlug } = require('../utils');

const Authors = ({ data }) => {
  const { nodes } = data.allContentfulAuthor;
  return (
    <ContentWrapper>
      <PageHeader title="All authors" />
      <hr />
      <ListView
        items={nodes.map(({ name }, index) => ({
          title: `${index + 1}. ${name}`,
          path: getSlug(name),
        }))}
      />
    </ContentWrapper>
  );
};

export default Authors;

export const query = graphql`
  {
    allContentfulAuthor(sort: { fields: name, order: ASC }) {
      nodes {
        name
      }
    }
  }
`;
