const navConfig = {
  'Polish': {
    url: 'https://www.apollographql.com/docs',
    description:
      'Learn about each part of the Apollo platform and how they all work together.',
    omitLandingPage: true
  },
  'English': {
    url: 'https://www.apollographql.com/docs/apollo-server',
    description:
      'Configure a production-ready GraphQL server to fetch and combine data from multiple sources.'
  },
  'Shanties': {
    url: 'https://www.apollographql.com/docs/react',
    description:
      "Manage the entirety of your React app's state and seamlessly execute GraphQL operations."
  }
};

const footerNavConfig = {
  Blog: {
    href: 'https://blog.apollographql.com/',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  Contribute: {
    href: 'https://www.apollographql.com/docs/community/'
  }
};

module.exports = {
  siteName: 'Guitar Book',
  pageTitle: 'Guitar Book',
  menuTitle: 'Guitar Book Platform',
  gaTrackingId: 'UA-74643563-13',
  algoliaApiKey: '768e823959d35bbd51e4b2439be13fb7',
  algoliaIndexName: 'guitarBookData',
  baseUrl: 'https://www.apollographql.com',
  logoLink: 'https://www.apollographql.com/docs/',
  baseDir: 'songs',
  contentDir: 'content',
  navConfig,
  footerNavConfig
};
