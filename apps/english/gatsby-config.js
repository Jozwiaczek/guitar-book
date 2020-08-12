const themeOptions = require('gatsby-theme-guitar-book/theme-options');

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-guitar-book`,
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'Guitar book English',
        description: 'How to use the Guitar Book platform',
        githubRepo: 'jozwiaczek/guitar-book',
        spectrumPath: '/',
        sidebarCategories: {
          null: ['index', 'ballada-o-cyckach']
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
