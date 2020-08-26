const navConfig = {
  'Example Song Book': {
    url: 'https://guitar-book.netlify.app/english',
    description:
      'Navigate to guitar book with english songs'
  }
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
        pageTitle: 'Guitar Book',
        subtitle: 'Template Songs',
        menuTitle: 'Songs Types',
        contentDir: 'content',
        sidebarCategories: {
          null: ['index'],
          'Author X': [
            'authorX/songX'
          ],
          'Other Guitar Books': [
            '[🤷🏻‍ How to use guitar book?](https://github.com/Jozwiaczek/guitar-book)',
            'test'
          ],
        },
        navConfig,
        footerNavConfig
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
