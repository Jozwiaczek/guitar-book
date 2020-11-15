const path = require('path');

const { createPrinterNode } = require('gatsby-plugin-printer');

const { getSlug } = require('./src/utils');

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
      const path = isHomepage ? '/' : getSlug(title);
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
      allContentfulSidebar {
        edges {
          node {
            items {
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
      allContentfulSong {
        edges {
          node {
            id
            title
            author {
              name
            }
          }
        }
      }
      allContentfulAuthor {
        edges {
          node {
            id
            name
          }
        }
      }
      allContentfulPage {
        edges {
          node {
            id
            isHomepage
            title
          }
        }
      }
    }
  `);

  const songTemplate = require.resolve('./src/components/templates/song-template');
  const pageTemplate = require.resolve('./src/components/templates/page-template');
  const authorTemplate = require.resolve('./src/components/templates/author-template');

  const sidebarContents = getSidebarContents(data.allContentfulSidebar.edges); // add order field in all sidebar items

  // Author page
  data.allContentfulAuthor.edges.forEach(({ node }) => {
    const { id, name } = node;
    actions.createPage({
      path: getSlug(name),
      component: authorTemplate,
      context: {
        id,
        name,
        sidebarContents,
        twitterHandle,
        adSense,
        baseUrl,
      },
    });
  });

  // Song page
  data.allContentfulSong.edges.forEach(({ node }) => {
    const { id, title, author } = node;
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

  // Static page
  data.allContentfulPage.edges.forEach(({ node }) => {
    const { id, title, isHomepage } = node;
    actions.createPage({
      path: isHomepage ? '/' : getSlug(title),
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
  });
};
