export const getSlug = (...nodes) => {
  nodes = nodes.map((n) =>
    n
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-'),
  );
  return `/${nodes.join('/')}`;
};
