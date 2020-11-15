import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Link from './link';

const List = styled.ul`
  list-style: none;
  margin-left: 0;
  margin-bottom: 32px;
`;

const ListItem = styled.li`
  text-decoration: none;
  margin-bottom: 0.25rem;
`;

const Header = ({ title }) => {
  return (
    <>
      <h2>{title}</h2>
      <hr />
    </>
  );
};

export default function ListView({ title, items }) {
  return (
    <>
      {title && <Header title={title} />}
      <List>
        {items.map(({ path, title }, index) => (
          <ListItem>
            <Link key={index} to={path}>
              {title}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
}

ListView.propType = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
