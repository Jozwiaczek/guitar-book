require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-guitar-book`,
      options: {
        contentfulAPIKey: process.env.CONTENTFUL_ACCESS_TOKEN,
        contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
        gaTrackingId: process.env.GOOGLE_ANALITYCS_TRACKING_ID,
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
