import { getSlug } from './src/utils/getSlug';

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
  { baseDir = '', defaultVersion = 'default', localVersion, siteName, subtitle, sidebarCategories },
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
  const { items } = edges[0].node;

  return items.reduce((sidebar, props) => {
    const type = props.sys.contentType.sys.id;

    if (type === 'sidebarSongs') {
      const songSidebarName = props.name;
      const pages = props.songs.map(({ title, author }) => {
        const authorName = author.name;
        return {
          title,
          author: authorName,
          path: getSlug(authorName, title),
        };
      });
      sidebar.push({ title: songSidebarName, pages });
      return sidebar;
    }
    if (type === 'song') {
      const { title, author } = props;
      const authorName = author.name;
      const isAlready = !!sidebar.find((item) => {
        return !item.title;
      });

      if (isAlready) {
        return sidebar.map((item) => {
          if (!item.title) {
            item.pages.push({ title, author: authorName, path: getSlug(authorName, title) });
          }
          return item;
        });
      }

      sidebar.push({
        title: '',
        pages: [{ title, author: authorName, path: getSlug(authorName, title) }],
      });
      return sidebar;
    }
    if (type === 'sidebarAnchor') {
      const { title, link } = props;

      const isAlready = !!sidebar.find((item) => !item.title);

      if (isAlready) {
        return sidebar.map((item) => {
          if (!item.title) {
            item.pages.push({
              anchor: true,
              title,
              path: link,
            });
          }
          return item;
        });
      }

      sidebar.push({
        title: '',
        pages: [
          {
            anchor: true,
            title,
            path: link,
          },
        ],
      });
      return sidebar;
    }
    console.error('Unsupported sidebar link');
    return sidebar;
  }, []);
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
            items {
              ... on ContentfulSidebarSongs {
                name
                songs {
                  title
                  author {
                    name
                  }
                }
                sys {
                  contentType {
                    sys {
                      id
                    }
                  }
                }
              }
              ... on ContentfulSidebarAnchor {
                link
                title
                sys {
                  contentType {
                    sys {
                      id
                    }
                  }
                }
              }
              ... on ContentfulSong {
                title
                author {
                  name
                }
                sys {
                  contentType {
                    sys {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const template = require.resolve('./src/components/template');

  data.allContentfulSong.edges.forEach(({ node }) => {
    const { id, author, title } = node;

    actions.createPage({
      path: getSlug(author.name, title),
      component: template,
      context: {
        id,
        subtitle,
        sidebarContents: getSidebarContents(data.allContentfulSidebar.edges),
        twitterHandle,
        adSense,
        baseUrl,
      },
    });
  });
};
