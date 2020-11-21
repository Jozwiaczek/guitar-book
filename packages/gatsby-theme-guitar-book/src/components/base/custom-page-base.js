import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import PageHeader from '../page-header';
import ContentWrapper from './components/content-wrapper';
import SEO from './components/seo';

const CustomPageBase = ({ children, title, description }) => {
  const { contentfulGlobalSettings } = useStaticQuery(graphql`
    query PageBaseQuery {
      contentfulGlobalSettings {
        siteName
        baseUrl
        adSense
      }
    }
  `);

  const { siteName, baseUrl, adSense } = contentfulGlobalSettings;

  return (
    <>
      <SEO
        title={title}
        description={description}
        siteName={siteName}
        baseUrl={baseUrl}
        adSense={adSense}
      />
      <ContentWrapper>
        <PageHeader title={title} description={description} />
        <hr />
        {children}
      </ContentWrapper>
    </>
  );
};

CustomPageBase.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default CustomPageBase;
