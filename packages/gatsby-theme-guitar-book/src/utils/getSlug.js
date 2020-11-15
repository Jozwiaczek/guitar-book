export const getSlug = (...nodes) => {
  nodes = nodes.map(
    (n) =>
      n
        .replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '') // Removing emoji
        .toLowerCase()
        .replace(/[^\w ]+/g, '') // Remove special characters from string
        .replace(/ +$/g, '') // Remove white spaces on the end of string
        .replace(/ +/g, '-'), // Replace white spaces inside of string
  );
  return `/${nodes.join('/')}`;
};
