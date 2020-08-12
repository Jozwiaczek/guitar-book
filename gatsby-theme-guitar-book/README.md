<div align="center">
  <img height="80" src="https://i.imgur.com/RcWoDL4.png">
  <h1 align="center">Apollo Gatsby Themes</h1>
</div>

This repo contains [Gatsby](https://gatsbyjs.org) themes made by Apollo.

## Packages

- [`gatsby-theme-apollo`](./packages/gatsby-theme-apollo)
- [`gatsby-theme-apollo-core`](./packages/gatsby-theme-apollo-core)
- [`gatsby-theme-apollo-docs`](./packages/gatsby-theme-apollo-docs)

# gatsby-theme-apollo-docs

This is an entirely configuration-based Gatsby theme that generates a documentation website based on a series of Markdown or MDX files. It also exports a series of [components](#components) that can be used within MDX pages.

- [Installation](#installation)
- [Configuration](#configuration)
- [Options](#options)
  - [`versions`](#versions)
  - [`sidebarCategories`](#sidebarcategories)
  - [`navConfig`](#navconfig)
- [Creating pages](#creating-pages)
- [Component shadowing](#component-shadowing)
- [Components](#components)
  - [`ExpansionPanel`](#expansionpanel)
  - [`ExpansionPanelList`](#expansionpanellist)
  - [`ExpansionPanelListItem`](#expansionpanellistitem)
  - [`MultiCodeBlock`](#multicodeblock)
- [Deployment](#deployment)
- [Migration](#migration)
- [Examples](#examples)
- [License](#license)

## Installation

If you're using this package, you'll also need to install `gatsby` and its peer dependencies, `react` and `react-dom`. Next, install the theme:

```bash
$ npm install gatsby-theme-apollo-docs
```

## Configuration

You can configure `gatsby-theme-apollo-docs` for use with any set of docs using the provided configuration options. You may also use [component shadowing](../gatsby-theme-apollo-core#customizing-the-logo) to customize elements like the logo or color scheme.

```js
// gatsby-config.js
module.exports = {
  pathPrefix: '/docs/apollo-server',
  plugins: [
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        root: __dirname,
        subtitle: 'Apollo Server',
        description: 'A guide to using Apollo Server',
        githubRepo: 'apollographql/apollo-server',
        defaultVersion: '2',
        versions: {
          '1': 'version-1'
        },
        sidebarCategories: {
          null: [
            'index',
            'getting-started',
            'whats-new'
          ],
          Features: [
            'features/mocking',
            'features/errors',
            'features/data-sources'
          ]
        }
      }
    }
  ]
};
```

## Options

| Option name       | Type   | Required | Description                                                                                                                             |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| root              | string | Yes      | Must be `__dirname`                                                                                                                     |
| siteName          | string | Yes      | The main title for the website, used in the `<title>` element and top left corner of the site                                           |
| description       | string | Yes      | The site description for SEO and social (FB, Twitter) tags                                                                              |
| sidebarCategories | object | Yes      | An object mapping categories to page paths (see [`sidebarCategories` reference](#sidebarcategories))                                    |
| subtitle          | string | No       | The page title that gets rendered above the sidebar navigation                                                                          |
| pageTitle         | string | No       | The string to be rendered in the page's `<title>` tag. If omitted, `siteName` will be used.                                             |
| baseDir           | string | No       | If your Gatsby site does not live in the root of your project directory/git repo, pass the subdirectory name here (`docs`, for example) |
| contentDir        | string | No       | The directory where docs content exists (`content` by default)                                                                          |
| githubRepo        | string | No       | The owner and name of the content repository on GitHub                                                                                  |
| gaTrackingId      | string | No       | Your site's Google Analytics tracking ID                                                                                                |
| algoliaApiKey     | string | No       | Your [Algolia DocSearch](https://community.algolia.com/docsearch/) API key                                                              |
| algoliaIndexName  | string | No       | The name of your DocSearch index                                                                                                        |
| baseUrl           | string | No       | The origin where your website will be hosted (e.g. `https://www.apollographql.com`)                                                     |
| twitterHandle     | string | No       | Your Twitter handle, without the "@"                                                                                                    |
| youtubeUrl        | string | No       | The URL of your YouTube channel                                                                                                         |
| defaultVersion    | string | No       | An identifier for the default selected version, served at the root of the docset (/)                                                    |
| localVersion      | string | No       | If the local files represent a version different from the `defaultVersion`, specify an identifier for the local version here            |
| versions          | array  | No       | An array of objects representing the versions that the website should generate                                                          |
| navConfig         | object | No       | An object defining the top-left navigation links (see [`navConfig` reference](#navconfig))                                              |
| checkLinksOptions | object | No       | Options accepted by [`gastby-remark-check-links`](https://github.com/trevorblades/gatsby-remark-check-links#options)                    |
| ignore            | array  | No       | Files to ignore using [anymatch](https://github.com/es128/anymatch)-compatible definition pattern

### `versions`

If omitted, only one version of docs will be built, based on the files in the theme consumer repository. If provided, the `versions` option expects an object mapping older versions' labels to their respective git branch. The current filesystem will still determine the "default" version. The default label for this version is "Latest", but is configurable by the `defaultVersion` option.

```
defaultVersion: '2.5',
versions: {
  '2.4': 'version-2.4'
}
```

### `sidebarCategories`

The `sidebarCategories` option is an object keyed by category titles. Each entry in the object is an array of page paths. The path should resemble the location of a Markdown/MDX file in the git repository, relative to `contentDir`, and without the _.md_ extension. Sidebar navigation items that are **not** a member of a category live under the `null` key. To add an external link to your sidebar, your can provide a string formatted like a Markdown link.

```
{
  null: [
    'index',
    'getting-started',
    'whats-new'
  ],
  Features: [
    'features/mocking',
    'features/errors',
    'features/data-sources'
  ],
  'External links': [
    '[Principled GraphQL](https://principledgraphql.com/)'
  ]
}
```

### `navConfig`

The `navConfig` option should be an object keyed by link titles. The values should be objects with `description`, and `url` properties. Check out the [default theme options](./theme-options.js) for an example of the expected shape of this data.

## Creating pages

This theme generates pages based on Markdown or MDX files in the [`contentDir`](#configuration) directory of a repo. Your Markdown/MDX files should contain some frontmatter defining their titles and descriptions.

```yaml
---
title: Introduction
description: What is Apollo Server and what does it do?
---

Apollo Server is the best way to quickly build a production-ready, self-documenting API for GraphQL clients, using data from any source.
```

Page URLs will be derived from the file paths of your Markdown. You can nest Markdown files within directories to create pages with additional path segments. You can overwrite this default path by adding a `slug` field to your Markdown frontmatter header.

## Component shadowing

You can customize a website using this theme further by taking advantage of [component shadowing](../gatsby-theme-apollo-core#customizing-the-logo).

By default, this theme sets the website favicon to [the one from Apollo's website](https://www.apollographql.com/favicon.ico) within its [internal `SEO` component](../gatsby-theme-apollo-core/src/components/seo.js). If you wanted to use your own favicon, you could shadow the `SEO` component within your site and add your custom SEO/favicon implementation.

```js
// src/gatsby-theme-apollo-docs/components/seo.js
import React from 'react';
import {Helmet} from 'react-helmet';

export default function SEO({title, description, siteName}) {
  return (
    <Helmet>
      <link rel="icon" href="/path/to/custom-favicon.ico" />
      {/* other SEO tags (OpenGraph, Twitter, etc.) */}
    </Helmet>
  );
}
```

## Components

This theme exports React components that you can use in MDX files throughout a documentation website.

### `ExpansionPanel`

An expandable panel of content used to hide complex information or instructions that might be a tangent from the main topic of the content it lives within.

| Prop     | Type   | Description                                                        |
| -------- | ------ | ------------------------------------------------------------------ |
| children | node   | The content of the panel, usually includes an `ExpansionPanelList` |
| title    | string | The title of the panel, visible even when the panel is closed      |

### `ExpansionPanelList`

A wrapper element that should be used in conjunction with [`ExpansionPanelListItem`](#expansionpanellistitem) components. It renders an `li` element with some styles baked in.

### `ExpansionPanelListItem`

A list item for use with the `ExpansionPanelList`. It comes with a cicular area to its left to render a number, glyph, or some way to indicate progress through a set of instructions. You can write Markdown within these elements if you keep everything detabbed and add an empty line between your content and the component's opening and closing tags.

| Prop     | Type   | Description                                                                            |
| -------- | ------ | -------------------------------------------------------------------------------------- |
| children | node   | The content of the list item, usually a block of Markdown                              |
| number   | string | The number displayed to the left of the list item, or a checkmark if "check" is passed |

```js
import {
  ExpansionPanel,
  ExpansionPanelList,
  ExpansionPanelListItem
} from 'gatsby-theme-apollo-docs';

<ExpansionPanel title="How to use the ExpansionPanel component">

Add a line break _between_ JSX tags and content to parse the content as *Markdown*

<ExpansionPanelList>
<ExpansionPanelListItem number="1">

<h4>h4 works well as a heading here</h4>

- markdown
- works
- here

</ExpansionPanelListItem>
<ExpansionPanelListItem number="check">

<h4>That's it!</h4>

> MDX is super fun

</ExpansionPanelListItem>
</ExpansionPanelList>

</ExpansionPanel>
```

### `MultiCodeBlock`

Wraps adjacent code blocks to allow users to toggle between them using a dropdown menu.

````js
import {MultiCodeBlock} from 'gatsby-theme-apollo-docs';

<MultiCodeBlock>

```js
// a JavaScript code block
```

```ts
// a TypeScript code block
```

</MultiCodeBlock>
````

## Deployment

All docs sites will eventually be deployed into a subdirectory, as configured by the `pathPrefix` option&mdash;/docs/apollo-server, for example. [Read this guide](../gatsby-theme-apollo-core/#deploying-to-a-subdirectory) to learn more about publishing to a subdirectory.

## Migration

To migrate an older Hexo site to this theme, [follow this guide](MIGRATION.md).

## Examples

- [Apollo](https://www.apollographql.com/docs)
- [WPGraphQL](https://docs.wpgraphql.com)
- [Analytics](https://getanalytics.io)
- [Sigmetic](https://docs.sigmetic.io)

Are you using this theme in your own project? Submit a PR with your website added to this list!

## License

[MIT](../../LICENSE)

# gatsby-theme-apollo-core

This is the base theme for building Apollo-branded Gatsby sites. It contains a small amount of configuration, and a handful of components that make it easy to build consistent-looking UIs.

It comes with a few Gatsby plugins:

 - `gatsby-plugin-svgr` enables [importing SVGs as React components](https://www.gatsbyjs.org/packages/gatsby-plugin-svgr)
 - `gatsby-plugin-emotion` server renders your [Emotion](https://emotion.sh) styles
 - `gatsby-plugin-react-helmet` server renders `<head>` tags set with [React Helmet](https://github.com/nfl/react-helmet)
 - `gatsby-plugin-typography` provides a stylesheet reset and sets default styles for basic HTML elements

- [Installation](#installation)
- [Configuration](#configuration)
- [Components and utilities](#components-and-utilities)
  - [`Layout`](#layout)
  - [`Sidebar`](#sidebar)
  - [`SidebarNav`](#sidebarnav)
  - [`ResponsiveSidebar`](#responsivesidebar)
  - [`Logo`](#logo)
  - [Colors](#colors)
  - [Breakpoints](#breakpoints)
- [Deploying to a subdirectory](#deploying-to-a-subdirectory)
- [Examples](#examples)
- [License](#license)

## Installation

```bash
$ npm install gatsby gatsby-theme-apollo-core
```

## Configuration

```js
// gatsby-config.js
module.exports = {
  plugins: ['gatsby-theme-apollo-core'],
  siteMetadata: {
    title: 'Apollo rocks!',
    description: 'Gatsby themes are pretty cool too...'
  }
};
```

## Components and utilities

All of the React components and utilities documented here are available as named exports in the `gatsby-theme-apollo-core` package. You can import them like this:

```js
import {MenuButton, Sidebar, breakpoints} from 'gatsby-theme-apollo-core';
```

### `Layout`

`Layout` should wrap every page that gets created. It configures [React Helmet](https://github.com/nfl/react-helmet) and sets the meta description tag with data from the `siteMetadata` property in your Gatsby config.

```js
import {Layout} from 'gatsby-theme-apollo-core';

function MyPage() {
  return (
    <Layout>
      Hello world
    </Layout>
  );
}
```

| Prop name | Type | Required |
| --------- | ---- | -------- |
| children  | node | yes      |

### `Sidebar`

A component that renders a sidebar with a [`LogoTitle`](#logo-title) component in the top left corner. It can also be configured to collapse into the left side of the page on narrow windows.

```js
import {Layout, Sidebar} from 'gatbsy-theme-apollo';

function MyPage() {
  return (
    <Layout>
      <Sidebar>
        Sidebar content goes here
      </Sidebar>
    </Layout>
  );
}
```

| Prop name  | Type   | Required | Description                                                                      |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------- |
| children   | node   | yes      |                                                                                  |
| responsive | bool   | no       | If `true`, the sidebar will behave as a drawer absolutely positioned on the left |
| open       | bool   | no       | Controls the sidebar visibility when the `responsive` prop is `true`             |
| logoLink   | string | no       | The URL/path that the sidebar logo should link to                                |

### `SidebarNav`

A configurable two-tiered, expandable/collapsible navigation component for use in conjunction with the `Sidebar` component above. It accepts a `contents` prop that defines what links and collapsible sections get rendered. Here's an example of the expected shape of a `contents` prop:

```js
const contents = [
  {
    title: 'Getting started',
    path: '/'
  },
  {
    title: 'External link',
    path: 'https://apollographql.com',
    anchor: true
  },
  {
    title: 'Advanced features',
    pages: [
      {
        title: 'Schema stitching',
        path: '/advanced/schema-stitching'
      }
    ]
  }
];
```

Each element in the array can have `title`, `path`, `pages`, and `anchor` props. `pages` is an array of more elements with the same shape. By default, a [Gatsby `Link` component](https://www.gatsbyjs.org/docs/gatsby-link/) will be used to render the links, but you can use a regular HTML anchor tag (`<a>`) by passing the `anchor` property to `true` on any page object.

The `SidebarNav` component gives the currently selected page an "active" style, and if it's a subpage, it will keep the currently active section expanded. To facilitate this, you must pass the current path to the `pathname` prop. Luckily, Gatsby exposes this in the `location` prop that gets passed automatically to every page!

```js
import {Layout, Sidebar, SidebarNav} from 'gatsby-theme-apollo-core';

function MyPage(props) {
  return (
    <Layout>
      <Sidebar>
        <SidebarNav
          contents={contents}
          pathname={props.location.pathname}
        />
      </Sidebar>
    </Layout>
  );
}
```

| Prop name      | Type   | Required | Description                                                       |
| -------------- | ------ | -------- | ----------------------------------------------------------------- |
| contents       | array  | yes      | An array of items to render                                       |
| pathname       | string | yes      | The current path (`props.location.pathname` expected)             |
| alwaysExpanded | bool   | no       | If `true`, all collapsible sections are expanded and cannot close |


### `ResponsiveSidebar`

A render props component that manages the state for responsive sidebars. On mobile devices, the sidebar is opened by a `MenuButton` component, and dismissed when the user clicks away from the sidebar. This component's `children` prop accepts a function that provides values and functions to enable this behavior easily.

```js
import {
  Layout,
  Sidebar,
  ResponsiveSidebar,
  FlexWrapper,
  MenuButton
} from 'gatsby-theme-apollo-core';

function MyPage() {
  return (
    <Layout>
      <ResponsiveSidebar>
        {({sidebarOpen, openSidebar, onWrapperClick, sidebarRef}) => (
          <FlexWrapper onClick={onWrapperClick}>
            <Sidebar responsive open={sidebarOpen} ref={sidebarRef}>
              This is a sidebar
            </Sidebar>
            <MenuButton onClick={openSidebar} />
          </FlexWrapper>
        )}
      </ResponsiveSidebar>
    </Layout>
  );
}
```

| Prop name | Type | Required | Description                                                 |
| --------- | ---- | -------- | ----------------------------------------------------------- |
| children  | func | yes      | A render prop-style function that returns a React component |

### `Logo`

A component that renders the Apollo logo. This logo can be removed or replaced using component shadowing.

```js
import {Logo} from 'gatsby-theme-apollo-core';

function MyPage() {
  return <Logo />;
}
```

#### Customizing the logo

Through [component shadowing](https://www.gatsbyjs.org/blog/2019-01-29-themes-update-child-theming-and-component-shadowing/), you can override the logo that gets shown. Simply create a file that exports a SVG React component in your theme consumer at _src/gatsby-theme-apollo-core/components/logo.js_.

```js
// src/gatsby-theme-apollo-core/components/logo.js
export {ReactComponent as default} from '../../assets/custom-logo.svg';
```

Check out [this CodeSandbox link](https://codesandbox.io/s/mq7p0z3wmj) for a full component shadowing example.

[![Edit Component shadowing example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mq7p0z3wmj?fontsize=14)

| Prop name | Type | Required | Description                          |
| --------- | ---- | -------- | ------------------------------------ |
| noLogo    | bool | no       | If `true`, the Apollo logo is hidden |

### Colors

An object mapping semantic names to hex strings. All of these colors are drawn from [Space Kit](https://space-kit.netlify.com/?path=/story/color--brand-colors). You can use this utility to write CSS-in-JS rules like this:

```js
import {colors} from 'gatsby-theme-apollo-core';

const StyledButton = styled.button({
  color: colors.primary,
  background: colors.background
});
```

#### Customizing colors

You can override the default color palette using shadowing. The only constraint is that the `primary` and `secondary` palette keys must be [colors from Space Kit](https://github.com/apollographql/space-kit#colors). Here's an example of a shadowed color palette:

```js
// src/gatsby-theme-apollo-core/utils/colors.js
const {colors} = require('gatsby-theme-apollo-core/src/utils/colors');
const {colors: spaceKitColors} = require('@apollo/space-kit/colors');

exports.colors = {
  ...colors,
  primary: spaceKitColors.red.base,
  divider: '#aeaeae'
};
```

You can refer to the [default colors file](./src/utils/colors.js) for palette keys that can be customized.

 ### Breakpoints

 A mapping of size keys to media queries. This is useful for writing responsive CSS-in-JS components.

 ```js
 import {breakpoints} from 'gatsby-theme-apollo-core';

 const StyledMenu = styled.nav({
   fontSize: 24,
   [breakpoints.lg]: {
     fontSize: 20
   },
   [breakpoints.md]: {
     fontSize: 16
   },
   [breakpoints.sm]: {
     fontSize: 12
   }
 })
 ```

| Key | Value                      |
| --- | -------------------------- |
| sm  | @media (max-width: 600px)  |
| md  | @media (max-width: 850px)  |
| lg  | @media (max-width: 1120px) |

## Deploying to a subdirectory

In order to deploy a Gatsby site to a subdirectory, there are a few extra steps to take. First, you must provide a `pathPrefix` property in your Gatsby config. This option combined with the `--prefix-paths` option in the Gatsby CLI will handle most of the hard work. Read more about path prefixing in Gatsby [here](https://www.gatsbyjs.org/docs/path-prefix/).

```
// gatsby-config.js
module.exports = {
  ...
  pathPrefix: '/YOUR_PATH_PREFIX'
};
```

Now, when you run `npx gatsby bulid --prefix-paths`, all pages, references to static assets, and links between pages will be prefixed with your custom path. That means that if you made a page with the path _/about_, it will live at _/**YOUR_PATH_PREFIX**/about_. In order for this to work within our server configuration, your website files also must exist in a directory with the same name. Here's how this sequence of events would look if you ran commands in your terminal:

```bash
$ npx gatsby build --prefix-paths
$ mkdir -p YOUR_PATH_PREFIX
$ mv public/* YOUR_PATH_PREFIX
$ mv YOUR_PATH_PREFIX public/
```

We use [Netlify](https://netlify.com) to deploy our websites, so to express this slightly more complicated build process to them, create a _netlify.toml_ file that follows this pattern:

```toml
# netlify.toml
[build]
  base = "/"
  publish = "public/"
  command = "gatsby build --prefix-paths && mkdir -p YOUR_PATH_PREFIX && mv public/* YOUR_PATH_PREFIX && mv YOUR_PATH_PREFIX public/"
```

We use [Fly](https://fly.io) to manage our server rewrites and redirects. To point your new Netlify deployment to a page on apollographql.com, first [create a new backend](https://fly.io/sites/www-apollodata-com/backends) using your site's Netlify alias. Next, you'll need to [add _two_ rewrite rules](https://fly.io/sites/www-apollodata-com/rules):

- `/YOUR_PATH_PREFIX/:page` ➡️ `/YOUR_PATH_PREFIX/$page`
- `/YOUR_PATH_PREFIX` ➡️ `/YOUR_PATH_PREFIX`

Be sure to set the priority of each of these rules to `3`, or a value lower than the top two redirect rules that apply to our website root. Once these rewrite rules take effect, your site will be live at https://apollographql.com/YOUR_PATH_PREFIX.

## Examples

- [Principled GraphQL](https://github.com/apollographql/principled-graphql)

## License

[MIT](../../LICENSE)
