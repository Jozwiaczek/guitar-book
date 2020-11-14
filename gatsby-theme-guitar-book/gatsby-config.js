const mapKeys = require('lodash/mapKeys');

const { colors } = require('./src/utils/colors');

module.exports = ({
  siteName,
  pageTitle,
  description,
  contentfulAPIKey,
  contentfulSpaceId,
  gaTrackingId,
  ignore,
  checkLinksOptions,
}) => {
  const gatsbyRemarkPlugins = [
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        rejected: true,
      },
    },
    {
      resolve: 'gatsby-remark-autolink-headers',
    },
    {
      resolve: 'gatsby-remark-copy-linked-files',
      options: {
        ignoreFileExtensions: [],
      },
    },
    {
      resolve: 'gatsby-remark-mermaid',
      options: {
        mermaidOptions: {
          themeCSS: `
            .node rect,
            .node circle,
            .node polygon,
            .node path {
              stroke-width: 2px;
              stroke: black;
              fill: black;
            }
            .node.secondary rect,
            .node.secondary circle,
            .node.secondary polygon,
            .node.tertiary rect,
            .node.tertiary circle,
            .node.tertiary polygon {
              fill: white;
            }
            .node.secondary rect,
            .node.secondary circle,
            .node.secondary polygon {
              stroke: grey;
            }
            .cluster rect,
            .node.tertiary rect,
            .node.tertiary circle,
            .node.tertiary polygon {
              stroke: white;
            }
            .cluster rect {
              fill: none;
              stroke-width: 2px;
            }
            .edgeLabel {
              background-color: white;
            }
            .messageText, .noteText, .loopText {
              font-size: 12px;
            }
            g rect, polygon.labelBox {
              stroke-width: 2px;
            }
            g rect.actor {
              stroke: white;
              fill: white;
            }
            g rect.note {
              stroke: grey;
              fill: white;
            }
            g line.loopLine, polygon.labelBox {
              stroke: black;
              fill: white;
            }
          `,
        },
      },
    },
    'gatsby-remark-code-titles',
    {
      resolve: 'gatsby-remark-prismjs',
      options: {
        showLineNumbers: true,
      },
    },
    'gatsby-remark-rewrite-relative-links',
    {
      resolve: 'gatsby-remark-check-links',
      options: checkLinksOptions,
    },
  ];

  const plugins = [
    'gatsby-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-svgr',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-less',
      options: {
        modifyVars: mapKeys(colors, (value, key) => `color-${key}`),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: gatsbyRemarkPlugins,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: contentfulSpaceId,
        accessToken: contentfulAPIKey,
        downloadLocal: true,
        localeFilter: (locale) => locale.code === 'en-US',
      },
    },
    'gatsby-plugin-printer',
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Guitar Book`,
        short_name: `Guitar Book`,
        description: `Track and play best guitar songs for camping`,
        start_url: `/`,
        background_color: `#ede9fb`,
        theme_color: `#3f20ba`,
        display: `standalone`,
        icon: require.resolve('./src/assets/icon.png'),
      },
    },
    `gatsby-plugin-offline`,
  ];

  if (gaTrackingId) {
    plugins.push({
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: gaTrackingId,
      },
    });
  }

  return {
    siteMetadata: {
      title: pageTitle || siteName,
      siteName,
      description,
    },
    plugins,
  };
};
