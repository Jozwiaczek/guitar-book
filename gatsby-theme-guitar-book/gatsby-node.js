const path = require('path');

const jsYaml = require('js-yaml');
const git = require('simple-git')();
const { createFilePath } = require('gatsby-source-filesystem');

const { createPrinterNode } = require('gatsby-plugin-printer');

const { getVersionBasePath } = require('./src/utils');

function getConfigPaths(baseDir) {
  return [
    path.join(baseDir, 'gatsby-config.js'), // new gatsby config
    path.join(baseDir, '_config.yml'), // old hexo config
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
    let version = localVersion || defaultVersion;
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

    let versionRef = '';
    if (parent.gitRemote___NODE) {
      const gitRemote = getNode(parent.gitRemote___NODE);
      version = gitRemote.sourceInstanceName;
      versionRef = gitRemote.ref;

      const dirPattern = new RegExp(path.join('^', baseDir, contentDir));
      slug = slug.replace(dirPattern, '');
    }

    if (version !== defaultVersion) {
      slug = getVersionBasePath(version) + slug;
    }

    actions.createNodeField({
      node,
      name: 'version',
      value: version,
    });

    actions.createNodeField({
      node,
      name: 'versionRef',
      value: versionRef,
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

function getPageFromEdge({ node }) {
  return node.childMarkdownRemark || node.childMdx;
}

function getSidebarContents(sidebarCategories, edges, version, dirPattern) {
  return Object.keys(sidebarCategories).map((key) => ({
    title: key === 'null' ? null : key,
    pages: sidebarCategories[key]
      .map((linkPath) => {
        const match = linkPath.match(/^\[(.+)\]\((https?:\/\/.+)\)$/);
        if (match) {
          return {
            anchor: true,
            title: match[1],
            path: match[2],
          };
        }

        const edge = edges.find((edge) => {
          const { relativePath } = edge.node;
          const { fields } = getPageFromEdge(edge);
          return (
            fields.version === version &&
            relativePath.slice(0, relativePath.lastIndexOf('.')).replace(dirPattern, '') ===
              linkPath
          );
        });

        if (!edge) {
          return null;
        }

        const { frontmatter, fields } = getPageFromEdge(edge);
        return {
          title: frontmatter.title,
          sidebarTitle: fields.sidebarTitle,
          description: frontmatter.description,
          path: fields.slug,
        };
      })
      .filter(Boolean),
  }));
}

exports.createPages = async (
  { actions, graphql },
  { subtitle, sidebarCategories, twitterHandle, adSense, baseUrl },
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
    }
  `);

  const template = require.resolve('./src/components/template');

  data.allContentfulSong.edges.forEach(({ node }) => {
    const { id, author, title } = node;
    const slugAuthor = author.name.toLowerCase().replace(/ /g, '-');
    const slugTitle = title.toLowerCase().replace(/ /g, '-');
    const slug = `${slugAuthor}/${slugTitle}`;

    console.log('L:244 | slug: ', slug);

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
