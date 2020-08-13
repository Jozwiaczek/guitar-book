const navConfig = {
  'Polish Songs': {
    url: 'https://guitar-book.netlify.app/',
    description:
      'Navigate to guitar book with polish songs',
    omitLandingPage: true
  },
  'English Songs': {
    url: 'https://guitar-book.netlify.app/english',
    description:
      'Navigate to guitar book with english songs'
  },
  'Shanties Songs': {
    url: 'https://guitar-book.netlify.app/shanties',
    description:
      "Navigate to guitar book with shanties"
  }
};

const footerNavConfig = {};

module.exports = {
  siteName: 'Guitar Book',
  pageTitle: 'Guitar Book',
  menuTitle: 'Songs Types',
  gaTrackingId: 'UA-122299419-2',
  algoliaApiKey: '768e823959d35bbd51e4b2439be13fb7',
  algoliaIndexName: 'guitarBookData',
  baseUrl: 'https://guitar-book.netlify.app/',
  logoLink: 'https://guitar-book.netlify.app//',
  contentDir: 'content',
  navConfig,
  footerNavConfig
};
