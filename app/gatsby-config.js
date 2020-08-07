const themeOptions = require('gatsby-theme-song-book/theme-options');

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-song-book`,
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'Song book Basics',
        description: 'How to use the Apollo GraphQL platform',
        githubRepo: 'jozwiaczek/song-book',
        spectrumPath: '/',
        sidebarCategories: {
          null: ['index'],
          'Wojtek Szumanski': [
            'wojtek-szumanski/ballada-o-cyckach'
          ]
        },
      }
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
          failOnError: false
        }
      }
    }
  ]
};
