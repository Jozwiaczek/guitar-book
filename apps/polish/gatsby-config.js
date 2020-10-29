require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});
const themeOptions = require("gatsby-theme-guitar-book/theme-options");

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-guitar-book`,
      options: {
        ...themeOptions,
        root: __dirname,
        baseDir: "apps/polish",
        subtitle: "Polish Songs",
        contentfulAPIKey: process.env.CONTENTFUL_ACCESS_TOKEN,
        contentfulSpaceId: "zbrk25eluz73",
        sidebarCategories: {
          null: ["index"],
          General: [
            "general/aicha",
            "general/ajrisz",
            "general/ale-to-juz-bylo",
            "general/baska",
            "general/chodz-pomaluj-moj-swiat",
            "general/dzien-dobry",
            "general/jaka-jestes",
            "general/jezu-to-znowu-sie-stalo",
            "general/jolka-jolka",
            "general/kiedy-powiem-sobie-dosc",
            "general/kocham-cie-jak-irlandie",
            "general/koledzy",
            "general/lubie-mowic-z-toba",
            "general/moj-jest-ten-kawalek-podlogi",
            "general/nazywali-go-marynarz",
            "general/ostatni",
            "general/przezyj-to-sam",
            "general/statki-na-niebie",
            "general/ty-druha-we-mnie-masz",
            "general/zegarmistrz-swiatla"
          ],
          Dżem: [
            "dzem/czerwony-jak-cegla",
            "dzem/listy-do-m",
            "dzem/naiwne-pytania",
            "dzem/wehikul-czasu",
            "dzem/whisky"
          ],
          "Stare Dobre Małżeństwo": [
            "stare-dobre-malzenstwo/bieszczadzkie-anioly",
            "stare-dobre-malzenstwo/czarny-blues-o-czwartej-nad-ranem",
            "stare-dobre-malzenstwo/majka",
            "stare-dobre-malzenstwo/z-nim-bedziesz-szczesliwsza"
          ],
          Perfect: [
            "perfect/autobiografia",
            "perfect/kołysanka-dla-nieznajomej",
            "perfect/nie-placz-ewka",
            "perfect/niepokonani"
          ],
          "Lady Pank": [
            "lady-pank/mniej-niz-zero",
            "lady-pank/stacja-warszawa",
            "lady-pank/zawsze-tam-gdzie-ty"
          ],
          Myslovitz: [
            "myslovitz/cisza-i-wiatr",
            "myslovitz/dla-ciebie",
            "myslovitz/dlugosc-dzwieku-samotnosci"
          ],
          "Other Guitar Books": [
            "[English 🇺🇸](https://guitar-book.netlify.app/english)",
            "[Shanties 🏴‍](https://guitar-book.netlify.app/shanties)",
            "test"
          ]
        }
      }
    },
    {
      resolve: "gatsby-plugin-eslint",
      options: {
        cache: true,
        fix: true,
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ["develop"],
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    }
  ]
};
