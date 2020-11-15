function getVersionBasePath(version) {
  return `/v${version.replace(/\s+/g, '-')}`;
}

const getSlug = (...nodes) => {
  nodes = nodes.map((n) =>
    n
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-'),
  );
  return `/${nodes.join('/')}`;
};

const getSlugPage = (title, isHomepage = false) =>
  isHomepage
    ? '/'
    : `/${title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')}`;

exports.getVersionBasePath = getVersionBasePath;
exports.HEADER_HEIGHT = 72;
exports.getSlug = getSlug;
exports.getSlugPage = getSlugPage;
