const themeOptions = require('gatsby-theme-guitar-book/theme-options');

module.exports = {
  pathPrefix: '/english',
  plugins: [
    {
      resolve: `gatsby-theme-guitar-book`,
      options: {
        ...themeOptions,
        root: __dirname,
        baseDir: 'apps/english',
        subtitle: 'English Songs',
        sidebarCategories: {
          null: [
            'index',
            '9-crimes',
            'all-i-want',
            'all-start',
            'blame-it-on-me',
            'cringe',
            'dance-with-me',
            'dirty-paws',
            'dont-you-worry-child',
            'hallelujah',
            'hallelujah-2',
            'i-see-fire',
            'iris',
            'listening-to-the-men',
            'little-talks',
            'love-yourself',
            'mountain-sound',
            'our-last-summer',
            'pompeii',
            'riptade',
            'seaside',
            'sweater-weather',
            'take-on-me',
            'the-last-goodbye',
            'waiting-for-the-world-to-change',
            'wake-me-up',
            'we-dont-belive-whats-on-tv',
            'we-might-be-dead-by-tomorrow',
            'when-i-was-your-men',
            'youve-got-a-friend-in-me',
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
