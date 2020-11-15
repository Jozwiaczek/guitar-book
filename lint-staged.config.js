module.exports = {
  '*.js': [
    'prettier --write --config .prettierrc .',
    'eslint --fix --config .eslintrc --ignore-path .eslintignore .',
  ],
};
