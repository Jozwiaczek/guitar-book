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
          null: [ 'index' ],
          'Fast ⚡️': [
            'fast/bitwa',
            'fast/czemu-zeglujesz',
            'fast/cztery-piwka',
            'fast/dziki-wloczenga',
            'fast/gdzie-ta-keja',
            'fast/green-horn',
            'fast/heave-away-santiana',
            'fast/historia-zlego-sternika',
            'fast/hiszpanskie-dziewczyny',
            'fast/jasnowlosa',
            'fast/kochankowie-sally-brown',
            'fast/la-valette',
            'fast/marco-polo',
            'fast/mazury',
            'fast/pacyfik',
            'fast/pozegnanie-liverpoolu',
            'fast/przechyly',
            'fast/smialy-harpunnik',
            'fast/szanta-panien-i-mezatek',
          ],
          'Slow 🐢': [
            'slow/10-w-skali-beauforta',
            'slow/ballada-o-botany-bay',
            'slow/biala-sukienka',
            'slow/chlopcy-z-botany-bay',
            'slow/czarnobrody-kapitan',
            'slow/morze-moje-morze',
            'slow/plynmy-w-dol-do-starej-maui',
          ],
          'Fuck it ‍😈': [
            'fuck-it/ballada-o-cyckach',
            'fuck-it/ballada-o-cyckach-2',
            'fuck-it/chryzantemy',
            'fuck-it/hera-koka-hasz',
            'fuck-it/jasnoruda',
            'fuck-it/morskie-opowiesci',
            'fuck-it/piosenka-o-komarze',
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
