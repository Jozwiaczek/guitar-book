const themeOptions = require('gatsby-theme-guitar-book/theme-options');

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-guitar-book`,
      options: {
        ...themeOptions,
        root: __dirname,
        baseDir: 'apps/polish',
        subtitle: 'Polish Songs',
        sidebarCategories: {
          null: ['index'],
          'General': [
            'general/baska',
            'general/autobiografia',
            'general/chodz-pomaluj-moj-swiat',
            'general/jolka-jolka',
            'general/zegarmistrz-swiatla',
            'general/lubie-mowic-z-toba',
            'general/jaka-jestes',
            'general/kocham-cie-jak-irlandie',
            'general/nazywali-go-marynarz',
            'general/statki-na-niebie',
          ],
          'Myslovitz': [
            'myslovitz/dlugosc-dzwieku-samotnosci',
            'myslovitz/cisza-i-wiatr',
          ],
          'Stare Dobre Małżeństwo': [
            'stare-dobre-malzenstwo/czarny-blues-o-czwartej-nad-ranem',
            'stare-dobre-malzenstwo/majka',
            'stare-dobre-malzenstwo/z-nim-bedziesz-szczesliwsza',
            'stare-dobre-malzenstwo/bieszczadzkie-anioly',
          ],
          'Dżem': [
            'dzem/wehikul-czasu',
            'dzem/whisky',
            'dzem/czerwony-jak-cegla',
          ],
          'Perfect': [
            'perfect/autobiografia',
            'perfect/nie-placz-ewka',
            'perfect/kołysanka-dla-nieznajomej',
          ],
          'Lady Pank': [
            'lady-pank/stacja-warszawa',
            'lady-pank/zawsze-tam-gdzie-ty',
            'lady-pank/mniej-niz-zero',
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
