require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-guitar-book`,
      options: {
        root: __dirname,
        siteName: 'Guitar Book',
        pageTitle: 'Guitar Book',
        description: 'Track and play best guitar songs for camping',
        menuTitle: 'Songs Types',
        baseDir: 'apps/example',
        subtitle: 'Songs',
        baseUrl: 'https://guitar-book.netlify.app/',
        logoLink: 'https://guitar-book.netlify.app/',
        twitterHandle: 'jozwiaczek',
        gaTrackingId: 'UA-122299419-2',
        adSense: 'ca-pub-8136370322211479',
        youtubeUrl: 'https://www.youtube.com/c/JakubJ%C3%B3%C5%BAwiak/featured',
        contentfulAPIKey: process.env.CONTENTFUL_ACCESS_TOKEN,
        contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
        footerNavConfig: {},
        navConfig: {
          'Polish Songs 🇵🇱': {
            url: 'https://guitar-book.netlify.app/',
            description: 'Navigate to guitar book with example songs',
          },
          'English Songs 🇺🇸': {
            url: 'https://guitar-book.netlify.app/english',
            description: 'Navigate to guitar book with english songs',
          },
          'Shanties Songs 🏴‍': {
            url: 'https://guitar-book.netlify.app/shanties',
            description: 'Navigate to guitar book with shanties',
          },
        },
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
