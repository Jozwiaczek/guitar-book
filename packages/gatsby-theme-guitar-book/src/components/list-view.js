import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { colors as apolloColors } from '@apollo/space-kit/colors';

import { navigate } from 'gatsby';

import { boxShadow } from './search';
import { colors } from '../utils/colors';

const List = styled.ul`
  list-style: none;
  margin-left: 0;
  margin-bottom: 32px;
`;

const ListItem = styled.li`
  text-decoration: none;
  border-radius: 0.5rem;
  border: 0.1rem solid ${apolloColors.silver.darker};
  box-shadow: ${boxShadow};
  min-height: 3rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  color: #12151a;
  transition: all 150ms ease-in-out;
  &:active {
    color: ${colors.primary};
  }
  &:hover {
    cursor: pointer;
    text-decoration: none;
    border-color: ${colors.primary};
    color: ${colors.primary};
    padding: 0.95rem 2rem;
    border-width: 0.15rem;
    transform: scale(1.05);
  }
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
      {items?.length && (
        <List>
          {items.map(({ path, title }, index) => (
            <ListItem
              key={index}
              opacityItem={(index + 1) / items.length}
              onClick={() => navigate(path)}
            >
              {title}
            </ListItem>
          ))}
        </List>
      )}
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
