const { getSlug } = require('../utils');

export const getSidebarContent = (edges) => {
  const { items } = edges[0].node;

  return items.reduce((sidebar, props) => {
    const type = props.sys.contentType.sys.id;

    // Collapse songs sections
    if (type === 'sidebarSongs') {
      const songSidebarName = props.name;
      const pages = props.songs.map(({ id, title, author }) => {
        const authorName = author.name;
        return {
          id,
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
      const { id, title, description, isHomepage } = props;
      const path = isHomepage ? '/' : getSlug(title);
      const isAlready = !!sidebar.find((item) => {
        return !item.title;
      });

      if (isAlready) {
        return sidebar.map((item) => {
          if (!item.title) {
            item.pages.push({ id, title, author: description, path });
          }
          return item;
        });
      }

      sidebar.push({
        title: '',
        pages: [{ id, title, author: description, path }],
      });

      return sidebar;
    }
    console.error('Unsupported sidebar link');
    return sidebar;
  }, []);
};
