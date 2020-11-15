function getVersionBasePath(version) {
  return `/v${version.replace(/\s+/g, '-')}`;
}

const getSlug = (...nodes) => {
  nodes = nodes.map((n) =>
    n
      .replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '') // Removing emoji
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +$/g, '')
      .replace(/ +/g, '-'),
  );
  return `/${nodes.join('/')}`;
};

exports.getVersionBasePath = getVersionBasePath;
exports.HEADER_HEIGHT = 72;
exports.getSlug = getSlug;
