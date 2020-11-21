import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from './page-header';
import ContentWrapper from './content-wrapper';

const PageBase = ({ children, title, description }) => (
  <ContentWrapper>
    <PageHeader title={title} description={description} />
    <hr />
    {children}
  </ContentWrapper>
);

PageBase.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default PageBase;
