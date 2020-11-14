const path = require('path');

const { createPrinterNode } = require('gatsby-plugin-printer');

const { getSlug, getSlugPage } = require('./src/utils');

function getConfigPaths(baseDir) {
  return [
    path.join(baseDir, 'gatsby-config.js'), // new gatsby config
  ];
}

async function onCreateNode(
  { node, actions, getNode, loadNodeContent },
  { baseDir = '', siteName },
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

  const slug = node.path;

  if (
    ['SitePage'].includes(node.internal.type) &&
    !['/dev-404-page/', '/404/', '/404.html', '/offline-plugin-app-shell-fallback/'].includes(slug)
  ) {
    const outputDir = 'social-cards';
    const sidebar = node.context.sidebarContents;

    let title = siteName;
    let subtitle = '';
    let category = '';
    sidebar.forEach((sidebarItem) => {
      const tmp = sidebarItem.pages.find((page) => page.path === slug);
      if (tmp) {
        title = tmp.title;
        subtitle = sidebarItem.title;
        category = tmp.author;
      }
    });

    const fileName =
      slug
        .replace(/^\/|\/$/g, '')
        .replace('/', '-')
        .trim() || 'index';

    createPrinterNode({
      id: `${node.id} >>> Printer`,
      fileName,
      outputDir,
      data: {
        title,
        subtitle,
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
  }
}

exports.onCreateNode = onCreateNode;

const getSidebarContents = (edges) => {
  const { items } = edges[0].node;

  return items.reduce((sidebar, props) => {
    const type = props.sys.contentType.sys.id;

    // Collapse songs sections
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

    // Root page item
    if (type === 'page') {
      const { title, description, isHomepage } = props;
      const path = getSlugPage(title, isHomepage);
      const isAlready = !!sidebar.find((item) => {
        return !item.title;
      });

      if (isAlready) {
        return sidebar.map((item) => {
          if (!item.title) {
            item.pages.push({ title, author: description, path });
          }
          return item;
        });
      }

      sidebar.push({
        title: '',
        pages: [{ title, author: description, path }],
      });

      return sidebar;
    }
    console.error('Unsupported sidebar link');
    return sidebar;
  }, []);
};

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
              ... on ContentfulPage {
                id
                title
                isHomepage
                description
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
  const pageTemplate = require.resolve('./src/components/templates/page-template');

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
      case 'page': {
        const { id, title, isHomepage } = props;
        actions.createPage({
          path: getSlugPage(title, isHomepage),
          component: pageTemplate,
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
      default:
        console.error('Unsupported page');
        break;
    }
  });
};
