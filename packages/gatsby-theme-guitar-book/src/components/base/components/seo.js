import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import Helmet from 'react-helmet';

export default function SEO({ image, title, description, siteName, adSense }) {
  const imagePath = withPrefix(`/${image}`);

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imagePath} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />
      <meta name="apple-mobile-web-app-capable" />
      {adSense && (
        <script
          async
          data-ad-client={adSense}
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
      )}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  adSense: PropTypes.string,
};
