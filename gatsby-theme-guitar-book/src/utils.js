function getVersionBasePath(version) {
  return `/v${version.replace(/\s+/g, '-')}`;
}

const getSlug = (authorName, title) => {
  const slugAuthor = authorName.toLowerCase().replace(/ /g, '-');
  const slugTitle = title.toLowerCase().replace(/ /g, '-');
  return `/${slugAuthor}/${slugTitle}`;
};

exports.getVersionBasePath = getVersionBasePath;
exports.HEADER_HEIGHT = 72;
exports.getSlug = getSlug;
