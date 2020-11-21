const path = require('path');

const { createPrinterNode } = require('gatsby-plugin-printer');

const { getSlug } = require('./src/utils/helpers');

async function onCreateNode({ node, actions, getNode, loadNodeContent }, { siteName }) {
  const slug = node.path;

  if (
    ['SitePage'].includes(node.internal.type) &&
    !['/dev-404-page/', '/404/', '/404.html', '/offline-plugin-app-shell-fallback/'].includes(slug)
  ) {
    const outputDir = 'social-cards';

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
        title: siteName,
        subtitle: node.context.title,
        category: node.context.author && node.context.author.name,
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
      name: 'isSong',
      value: !!node.context.isSong,
    });

    actions.createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    actions.createNodeField({
      node,
      name: 'id',
      value: node.context.id,
    });
  }
}

exports.onCreateNode = onCreateNode;

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    {
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
      contentfulGlobalSettings {
        adSense
      }
    }
  `);

  const songTemplate = require.resolve('./src/templates/song-template');
  const pageTemplate = require.resolve('./src/templates/page-template');
  const authorTemplate = require.resolve('./src/templates/author-template');
  const { adSense } = data.contentfulGlobalSettings;

  // Author page
  data.allContentfulAuthor.edges.forEach(({ node }) => {
    const { id, name } = node;
    actions.createPage({
      path: getSlug(name),
      component: authorTemplate,
      context: {
        id,
        title: name,
        adSense,
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
        author,
        title,
        adSense,
        isSong: true,
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
        title,
        adSense,
      },
    });
  });
};
