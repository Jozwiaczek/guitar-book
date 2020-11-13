const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

const { createPrinterNode } = require('gatsby-plugin-printer');

const { getSlug } = require('./src/utils');

function getConfigPaths(baseDir) {
  return [
    path.join(baseDir, 'gatsby-config.js'), // new gatsby config
  ];
}

async function onCreateNode(
  { node, actions, getNode, loadNodeContent },
  { baseDir = '', siteName, subtitle, sidebarCategories },
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

function getSidebarContents(edges) {
  const { items } = edges[0].node;

  return items.reduce((sidebar, props) => {
    const type = props.sys.contentType.sys.id;

    // Collapse sections
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

    // Root homepage item
    if (type === 'homepage') {
      const { title, description } = props;
      const isAlready = !!sidebar.find((item) => {
        return !item.title;
      });

      if (isAlready) {
        return sidebar.map((item) => {
          if (!item.title) {
            item.pages.push({ title, author: description, path: '/' });
          }
          return item;
        });
      }

      sidebar.push({
        title: '',
        pages: [{ title, author: description, path: '/' }],
      });

      return sidebar;
    }

    // Root links
    if (type === 'anchor') {
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
      allContentfulSidebar(filter: { node_locale: { eq: "en-US" } }) {
        edges {
          node {
            items {
              ... on ContentfulSidebarSongs {
                name
                songs {
                  id
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
              ... on ContentfulAnchor {
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
            }
          }
        }
      }
    }
  `);

  const songTemplate = require.resolve('./src/components/templates/song-template');
  const homepageTemplate = require.resolve('./src/components/templates/homepage-template');

  data.allContentfulSidebar.edges[0].node.items.forEach((props) => {
    const type = props.sys.contentType.sys.id;
    const sidebarContents = getSidebarContents(data.allContentfulSidebar.edges); // add order field in all sidebar items

    switch (type) {
      case 'sidebarSongs': {
        props.songs.forEach(({ id, title, author }) => {
          actions.createPage({
            path: getSlug(author.name, title),
            component: songTemplate,
            context: {
              id,
              subtitle,
              sidebarContents,
              twitterHandle,
              adSense,
              baseUrl,
            },
          });
        });
        break;
      }
      case 'homepage': {
        const { id } = props;
        actions.createPage({
          path: '/',
          component: homepageTemplate,
          context: {
            id,
            subtitle,
            sidebarContents,
            twitterHandle,
            adSense,
            baseUrl,
          },
        });
        break;
      }
      case 'anchor': {
        console.count('Sidebar anchors:');
        break;
      }
      default:
        console.error('Unsupported page');
        break;
    }
  });
};
