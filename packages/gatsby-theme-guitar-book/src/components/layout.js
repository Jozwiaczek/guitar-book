import '../styles.less';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

export default function Layout({ children }) {
  const { contentfulGlobalSettings } = useStaticQuery(
    graphql`
      {
        contentfulGlobalSettings {
          siteName
          description
        }
      }
    `,
  );
  const { siteName, description } = contentfulGlobalSettings;

  return (
    <>
      <Helmet defaultTitle={siteName} titleTemplate={`%s - ${siteName}`}>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
