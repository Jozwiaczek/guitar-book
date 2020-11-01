const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

const { createPrinterNode } = require('gatsby-plugin-printer');

const { getVersionBasePath } = require('./src/utils');

function getConfigPaths(baseDir) {
  return [
    path.join(baseDir, 'gatsby-config.js'), // new gatsby config
  ];
}

async function onCreateNode(
  { node, actions, getNode, loadNodeContent },
  {
    baseDir = '',
    contentDir = 'content',
    defaultVersion = 'default',
    localVersion,
    siteName,
    subtitle,
    sidebarCategories,
  },
) {
  const configPaths = getConfigPaths(baseDir);
  if (configPaths.includes(node.relativePath)) {
    const value = await loadNodeContent(node);
    actions.createNodeField({
      name: 'raw',
      node,
      value,
    });
  }

  if (['MarkdownRemark', 'Mdx'].includes(node.internal.type)) {
    const parent = getNode(node.parent);
    const version = localVersion || defaultVersion;
    let slug = createFilePath({
      node,
      getNode,
    });

    if (node.frontmatter.slug) {
      slug = node.frontmatter.slug; // eslint-disable-line prefer-destructuring
    }

    let category;
    const fileName = parent.name;
    const outputDir = 'social-cards';

    for (const key in sidebarCategories) {
      if (key !== 'null') {
        const categories = sidebarCategories[key];
        const trimmedSlug = slug.replace(/^\/|\/$/g, '');
        if (categories.includes(trimmedSlug)) {
          category = key;
          break;
        }
      }
    }

    const { title, sidebar_title, graphManagerUrl } = node.frontmatter;
    createPrinterNode({
      id: `${node.id} >>> Printer`,
      fileName,
      outputDir,
      data: {
        title,
        subtitle: subtitle || siteName,
        category,
      },
      component: require.resolve('./src/components/social-card.js'),
    });

    actions.createNodeField({
      name: 'image',
      node,
      value: path.join(outputDir, `${fileName}.png`),
    });

    slug = getVersionBasePath(version) + slug;

    actions.createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    actions.createNodeField({
      node,
      name: 'sidebarTitle',
      value: sidebar_title || '',
    });

    actions.createNodeField({
      node,
      name: 'graphManagerUrl',
      value: graphManagerUrl || '',
    });
  }
}

exports.onCreateNode = onCreateNode;

// function getSidebarContents(sidebarCategories, edges, dirPattern) {
//   return Object.keys(sidebarCategories).map((key) => ({
//     title: key === 'null' ? null : key,
//     pages: sidebarCategories[key]
//       .map((linkPath) => {
//         const match = linkPath.match(/^\[(.+)\]\((https?:\/\/.+)\)$/);
//         if (match) {
//           return {
//             anchor: true,
//             title: match[1],
//             path: match[2],
//           };
//         }
//
//         return {
//           title: frontmatter.title,
//           sidebarTitle: fields.sidebarTitle,
//           description: frontmatter.description,
//           path: fields.slug,
//         };
//       })
//       .filter(Boolean),
//   }));
// }

// function getSidebarContents(sidebarCategories, edges) {
// return {
//             anchor: true,
//             title: match[1],
//             path: match[2],
//           };
//
// pages ->
// title
//
//	return {
//            title: frontmatter.title,
//            author: frontmatter.description,
//            path: fields.slug,
//          };
// }

function getSidebarContents(edges) {
  const tmp = edges.map(({ name, items }) => {
    console.log('L:151 | items: ', items);
  });
}

exports.createPages = async (
  { actions, graphql },
  { subtitle, twitterHandle, adSense, baseUrl },
) => {
  const { data } = await graphql(`
    {
      allContentfulSong(filter: { node_locale: { eq: "en-US" } }) {
        edges {
          node {
            title
            author {
              name
            }
            id
          }
        }
      }
      allContentfulSidebar(filter: { node_locale: { eq: "en-US" } }) {
        edges {
          node {
            name
            items {
              ... on ContentfulSidebarSongs {
                id
                name
                songs {
                  title
                  author {
                    name
                  }
                }
              }
              ... on ContentfulSong {
                title
              }
            }
          }
        }
      }
    }
  `);

  const template = require.resolve('./src/components/template');

  getSidebarContents(data.allContentfulSidebar.edges);

  data.allContentfulSong.edges.forEach(({ node }) => {
    const { id, author, title } = node;
    const slugAuthor = author.name.toLowerCase().replace(/ /g, '-');
    const slugTitle = title.toLowerCase().replace(/ /g, '-');
    const slug = `${slugAuthor}/${slugTitle}`;

    actions.createPage({
      path: slug,
      component: template,
      context: {
        id,
        subtitle,
        sidebarContents: [],
        twitterHandle,
        adSense,
        baseUrl,
      },
    });
  });
};
