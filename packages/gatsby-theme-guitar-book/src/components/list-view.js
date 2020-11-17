import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { navigate } from 'gatsby';

import { boxShadow } from './search';
import { colors } from '../utils/colors';

const List = styled.ul`
  list-style: none;
  margin-left: 0;
  margin-bottom: 32px;
`;

const hexToRgbA = (hex, opacity) => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join('')}`;
    // eslint-disable-next-line no-bitwise
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity})`;
  }
  return hex;
};

const ListItem = styled.li`
  text-decoration: none;
  margin-bottom: 0.3rem;
  background: ${({ opacityItem }) => hexToRgbA(colors.primaryLight, opacityItem)};
  border-radius: 0 0.5rem 0.5rem 0.5rem;
  box-shadow: ${boxShadow};
  margin-top: 1rem;
  min-height: 3rem;
  padding: 1rem 1rem 1rem 2rem;
  font-size: 1.1rem;
  color: #12151a;
  &:active {
    color: ${colors.primary};
  }
  &:hover {
    cursor: pointer;
    opacity: ${colors.hoverOpacity};
    text-decoration: none;
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
