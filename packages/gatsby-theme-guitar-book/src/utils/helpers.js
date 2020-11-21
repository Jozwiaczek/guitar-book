const getVersionBasePath = (version) => `/v${version.replace(/\s+/g, '-')}`;

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

const getHeadingsFromJson = (json) =>
  json.content.map(({ nodeType, content }) => {
    if (['heading-1', 'heading-2'].includes(nodeType)) {
      return content[0].value;
    }
  });

const getTextWithLimit = (text, limit) => {
  let result = '';
  const words = text.split(/ /);
  for (let i = 0; i < words.length && result.length < limit; i++) {
    result += `${words[i]} `;
  }
  return `${result} ...`;
};

module.exports = {
  getVersionBasePath,
  getSlug,
  getHeadingsFromJson,
  getTextWithLimit,
};
