import React from 'react';
import { graphql, navigate } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';
import { colors as apolloColors } from '@apollo/space-kit/colors';

import { colors } from '../utils/colors';
import { boxShadow } from '../components/search';
import breakpoints from '../utils/breakpoints';
import CustomPageBase from '../components/base/custom-page-base';

const { getSlug } = require('../utils/helpers');

const List = styled.ul`
  list-style: none;
  display: grid;
  margin-left: 0;
  margin-bottom: 32px;
  grid-auto-flow: row dense;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  ${breakpoints.lg} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${breakpoints.sm} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #12151a;
  background: ${colors.background};
  border-radius: 0.5rem;
  box-shadow: ${boxShadow};
  margin-top: 1rem;
  height: 300px;
  padding: 1rem;
  text-align: center;
  border: 0 solid ${apolloColors.silver.darker};
  transition: all 150ms ease-in-out;
  font-size: ${({ bigFont }) => (bigFont ? '2.6' : '1.4')}rem;
  ${breakpoints.sm} {
    width: 250px;
  }
  &:hover {
    cursor: pointer;
    text-decoration: none;
    border-color: ${colors.primary};
    color: ${colors.primary};
    padding: 0.95rem;
    border-width: 0.15rem;
    transform: scale(1.05);
  }
`;

const Authors = ({ data, uri }) => {
  const { nodes } = data.allContentfulAuthor;
  return (
    <CustomPageBase
      uri={uri}
      title="All authors 👨🏻‍🎤"
      description="Discover all authors which their songs are in this Guitar book!"
    >
      <List>
        {nodes.map(({ name, description, avatar }, index) => (
          <ListItem bigFont={!avatar} key={index} onClick={() => navigate(getSlug(name))}>
            {avatar && (
              <Img
                fluid={avatar.fluid}
                style={{
                  height: '240px',
                  width: '100%',
                  marginBottom: 16,
                }}
                imgStyle={{
                  objectFit: 'cover',
                  borderRadius: 10,
                }}
              />
            )}
            {name}
          </ListItem>
        ))}
      </List>
    </CustomPageBase>
  );
};

export default Authors;

export const query = graphql`
  {
    allContentfulAuthor(sort: { fields: name, order: ASC }) {
      nodes {
        name
        avatar {
          fluid(maxHeight: 1000, quality: 100) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`;
