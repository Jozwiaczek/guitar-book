import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import PageHeader from '../page-header';
import ContentWrapper from './components/content-wrapper';
import SEO from './components/seo';

const CustomPageBase = ({ children, title, description, uri }) => {
  const { contentfulGlobalSettings, allSitePage } = useStaticQuery(graphql`
    query PageBaseQuery {
      allSitePage {
        nodes {
          fields {
            image
          }
        }
      }
      contentfulGlobalSettings {
        siteName
        baseUrl
        adSense
      }
    }
  `);

  const matchedSite = allSitePage.nodes.find(
    (site) => site.fields?.image === `social-cards${uri}.png`,
  );
  const socialCardImagePath = matchedSite && matchedSite.fields.image;

  const { siteName, baseUrl, adSense } = contentfulGlobalSettings;

  return (
    <>
      <SEO
        title={title}
        description={description}
        siteName={siteName}
        baseUrl={baseUrl}
        adSense={adSense}
        image={socialCardImagePath}
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
  uri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default CustomPageBase;
