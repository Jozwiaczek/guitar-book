import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import Helmet from 'react-helmet';

export default function SEO({
  image,
  baseUrl,
  twitterHandle,
  title,
  description,
  siteName,
  adSense,
}) {
  const imagePath = withPrefix(`/${image}`);

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:image" content={imagePath} />
      <meta name="apple-mobile-web-app-capable" />
      {baseUrl && <meta name="twitter:image" content={baseUrl + imagePath} />}
      {twitterHandle && <meta name="twitter:site" content={`@${twitterHandle}`} />}
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
  baseUrl: PropTypes.string,
  image: PropTypes.string.isRequired,
  twitterHandle: PropTypes.string,
  adSense: PropTypes.string,
};
