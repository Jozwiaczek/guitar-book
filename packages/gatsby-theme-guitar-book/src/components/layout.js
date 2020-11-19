import '../styles.less';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

export default function Layout(props) {
  return (
    <StaticQuery
      query={graphql`
        {
          contentfulGlobalSettings {
            siteName
            description
          }
        }
      `}
      render={(data) => {
        const { siteName, description } = data.contentfulGlobalSettings;
        return (
          <>
            <Helmet defaultTitle={siteName} titleTemplate={`%s - ${siteName}`}>
              <meta name="description" content={description} />
            </Helmet>
            {props.children}
          </>
        );
      }}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
