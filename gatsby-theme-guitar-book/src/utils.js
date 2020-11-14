function getVersionBasePath(version) {
  return `/v${version.replace(/\s+/g, '-')}`;
}

const getSlug = (authorName, title) => {
  const slugAuthor = authorName.toLowerCase().replace(/ /g, '-');
  const slugTitle = title.toLowerCase().replace(/ /g, '-');
  return `/${slugAuthor}/${slugTitle}`;
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
