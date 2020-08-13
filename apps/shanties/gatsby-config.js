const themeOptions = require('gatsby-theme-guitar-book/theme-options');

module.exports = {
  pathPrefix: '/shanties',
  plugins: [
    {
      resolve: `gatsby-theme-guitar-book`,
      options: {
        ...themeOptions,
        root: __dirname,
        baseDir: 'apps/polish',
        subtitle: 'Shanties Songs',
        sidebarCategories: {
          null: [
            'index',
            'ballada-o-botany-bay',
            'szanta-panien-i-mezatek',
            'sztorm',
            'historia-zlego-sternika',
            'cztery-piwka',
            'la-valette'
          ],
          'Fuck it ‍😈': [
            'fuck-it/ballada-o-cyckach',
            'fuck-it/piosenka-o-komarze',
            'fuck-it/chryzantemy',
            'fuck-it/hera-koka-hasz',
          ],
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
