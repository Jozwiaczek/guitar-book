import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import PageHeader from '../page-header';
import ContentWrapper from './components/content-wrapper';
import SEO from './components/seo';

const CustomPageBase = ({ children, title, description, pathname }) => {
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
        adSense
      }
    }
  `);

  const formattedPathname = pathname?.replace(/\//g, '');

  const matchedSite = allSitePage.nodes.find((site) => {
    return site.fields?.image.endsWith(`${formattedPathname}.png`);
  });

  const socialCardImagePath = matchedSite && matchedSite.fields.image;

  const { siteName, adSense } = contentfulGlobalSettings;

  return (
    <>
      <SEO
        title={title}
        description={description}
        siteName={siteName}
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
  pathname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default CustomPageBase;
