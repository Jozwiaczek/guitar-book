const navConfig = {
  'Example Song Book': {
    url: 'https://guitar-book.netlify.app/english',
    description: 'Navigate to guitar book with english songs',
  },
};

const footerNavConfig = {};

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-guitar-book`,
      options: {
        root: __dirname,
        siteName: 'Guitar Book',
        description: 'Track and play best guitar songs for camping',
        baseUrl: 'https://guitar-book.netlify.app/',
        logoLink: 'https://guitar-book.netlify.app/',
        contentfulAPIKey: process.env.CONTENTFUL_ACCESS_TOKEN,
        contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
        pageTitle: 'Guitar Book',
        subtitle: 'SongTemplate Songs',
        menuTitle: 'Songs Types',
        navConfig,
        footerNavConfig,
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        cache: true,
        fix: true,
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
  ],
};
