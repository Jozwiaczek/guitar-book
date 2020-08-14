import PageLayout from './src/components/page-layout';
import React from 'react';

export const wrapPageElement = (
  {element, props}, // eslint-disable-line react/prop-types
  pluginOptions
) => (
  <PageLayout {...props} pluginOptions={pluginOptions}>
    {element}
  </PageLayout>
);
