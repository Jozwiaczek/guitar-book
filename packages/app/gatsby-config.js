require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-guitar-book`,
      options: {
        root: __dirname,
        contentfulAPIKey: process.env.CONTENTFUL_ACCESS_TOKEN,
        contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
        siteName: 'Guitar Book',
        pageTitle: 'Guitar Book - page',
        description: 'Track and play best guitar songs for camping',
        menuTitle: 'Songs Types',
        subtitle: 'Menu',
        baseUrl:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:8000/'
            : 'https://guitar-book-pjatk.netlify.app/',
        logoLink:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:8000/'
            : 'https://guitar-book-pjatk.netlify.app/',
        gaTrackingId: 'UA-122299419-2',
        adSense: 'ca-pub-8136370322211479',
        contactMail: 'kubencki@gmail.com',
        twitterUrl: 'https://twitter.com/jozwiaczek',
        instagramUrl: 'https://www.instagram.com/j_jozwiaczek/',
        soundcloudUrl: 'https://soundcloud.com/jakub-j-wiak-69817773',
        spotifyUrl: 'https://open.spotify.com/user/11102108168',
        youtubeUrl: 'https://www.youtube.com/c/JakubJ%C3%B3%C5%BAwiak/featured',
        footerNavConfig: {
          'Get your own Guitar Book': {
            href:
              'https://www.gatsbyjs.com/plugins/gatsby-theme-guitar-book/?=gatsby-theme-guitar/',
            target: '_blank',
            rel: 'noopener noreferrer',
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
