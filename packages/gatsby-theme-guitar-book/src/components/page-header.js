import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

import { Tooltip } from '@apollo/space-kit/Tooltip';

import { colors } from '../utils/colors';

const Heading = styled.h1({
  ':not(:last-child)': {
    marginBottom: 8,
  },
});

const Subheading = styled.h3({
  color: colors.text2,
});

const HeaderWrapper = styled.div`
  display: flex;
`;

const Icon = styled.span`
  margin-left: 20px;
  font-size: 30px;
`;

export default function PageHeader({ favourite, title, description }) {
  return (
    <div id="pageHeader" className="header-wrapper">
      <HeaderWrapper>
        <Heading>{title}</Heading>
        {favourite && (
          <Tooltip content="Favourite song">
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <Icon role="img" aria-label="favourite">
              ⭐️
            </Icon>
          </Tooltip>
        )}
      </HeaderWrapper>
      {description && <Subheading>{description}</Subheading>}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  favourite: PropTypes.bool,
  description: PropTypes.string,
};
