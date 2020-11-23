import React from 'react';
import { graphql } from 'gatsby';

import ListView from '../components/list-view';
import CustomPageBase from '../components/base/custom-page-base';

const { getSlug } = require('../utils/helpers');

const Songs = ({ data, location }) => {
  const { nodes } = data.allContentfulSong;
  return (
    <CustomPageBase
      pathname={location.pathname}
      title="All songs 🎶"
      description="Discover all songs which You can find in this Guitar book."
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
