export const getSlug = (authorName, title) => {
  const slugAuthor = authorName.toLowerCase().replace(/ /g, '-');
  const slugTitle = title.toLowerCase().replace(/ /g, '-');
  return `/${slugAuthor}/${slugTitle}`;
};
