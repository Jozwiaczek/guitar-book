# Gatsby Theme Guitar Book

This is an entirely configuration-based Gatsby theme that generates a guitar book website based on a series of Markdown or MDX files.
It also exports a series of [components](#components) that can be used within MDX pages.

- [Features](#features)
- [Published Demo Guitar Books](#published-demo-guitar-books)
- [Installation](#installation)
- [Configuration](#configuration)
- [Options](#options)
  - [`sidebarCategories`](#sidebarcategories)
  - [`navConfig`](#navconfig)
- [Adding songs](#addings-songs)
- [Component shadowing](#component-shadowing)
- [Components](#components)
  - [`Verse`](#verse)
  - [`ExpansionPanel`](#expansionpanel)
- [Deployment](#deployment)
- [Examples](#examples)
- [SongTemplate](#template)

## Features

- Plug and Play
- Fully customizable
- Mobile, Tablet and Desktop friendly
- SEO friendly
- App works offline, and it can be added to phone/desktop home screen
- Free storing space for songs
- Easy to edit songs
- Editing songs without programming knowledge
- Integrated with Google Analytic and Ad Sense
- Lyrics Auto scroll
- Chords mapping and their preview with how to play them
- Music Video for every song with just link from YouTube
- Fully covered search

## Published Demo Guitar Books

| Module         | Status                                                                                                                                                                    | Public URL                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Polish Songs   | [![Netlify Status](https://api.netlify.com/api/v1/badges/6b10ea9b-3c17-4f4d-b83f-ab785fabb281/deploy-status)](https://app.netlify.com/sites/guitar-book/deploys)          | https://guitar-book.netlify.app/         |
| English Songs  | [![Netlify Status](https://api.netlify.com/api/v1/badges/e739a182-2d8f-4875-8d1b-c3303122b3a1/deploy-status)](https://app.netlify.com/sites/guitar-book-english/deploys)  | https://guitar-book.netlify.app/english  |
| Shanties Songs | [![Netlify Status](https://api.netlify.com/api/v1/badges/1c311bcc-0193-4bc6-b624-23635c1754bc/deploy-status)](https://app.netlify.com/sites/guitar-book-shanties/deploys) | https://guitar-book.netlify.app/shanties |

## Installation

If you're using this package, you'll also need to install `gatsby` and its peer dependencies, `react` and `react-dom`. Next, install the theme:

```bash
npm install gatsby-theme-guitar-book
```

or

```bash
yarn add gatsby-theme-guitar-book
```

## Configuration

You can configure `gatsby-theme-guitar-book` for use with any set of app using the provided configuration options. You may also use [component shadowing](https://www.gatsbyjs.com/docs/themes/shadowing/) to customize elements like the logo or color scheme.

```js
// gatsby-config.js
module.exports = {
  pathPrefix: '/english',
  plugins: [
    {
      resolve: `gatsby-theme-guitar-book`,
      options: {
        ...themeOptions,
        root: __dirname,
        baseDir: 'apps/english',
        subtitle: 'English Songs',
        siteName: 'Guitar Book',
        pageTitle: 'Guitar Book',
        description: 'Track and play best guitar songs for camping',
        githubRepo: 'jozwiaczek/guitar-book',
        menuTitle: 'Songs Types',
        gaTrackingId: 'UA-122299419-2',
        baseUrl: 'https://guitar-book.netlify.app/',
        logoLink: 'https://guitar-book.netlify.app//',
        contentDir: 'content',
        twitterHandle: 'jozwiaczek',
        youtubeUrl: 'https://www.youtube.com/c/JakubJ%C3%B3%C5%BAwiak/featured',
        navConfig: {
          'Polish Songs 🇵🇱': {
            url: 'https://guitar-book.netlify.app/',
            description: 'Navigate to guitar book with example songs',
          },
          'English Songs 🇺🇸': {
            url: 'https://guitar-book.netlify.app/english',
            description: 'Navigate to guitar book with english songs',
          },
          'Shanties Songs 🏴‍': {
            url: 'https://guitar-book.netlify.app/shanties',
            description: 'Navigate to guitar book with shanties',
          },
        },
        sidebarCategories: {
          null: ['index'],
          'George Ezra': ['blame-it-on-me', 'listening-to-the-men'],
          'Other Guitar Books': [
            '[Polish 🇵🇱](https://guitar-book.netlify.app)',
            '[Shanties 🏴‍](https://guitar-book.netlify.app/shanties)',
          ],
        },
      },
    },
  ],
};
```

## Options

| Option name       | Type   | Required | Description                                                                                                                                |
| ----------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| root              | string | Yes      | Must be `__dirname`                                                                                                                        |
| siteName          | string | Yes      | The main title for the website, used in the `<title>` element and top left corner of the site                                              |
| description       | string | Yes      | The site description for SEO and social (FB, Twitter) tags                                                                                 |
| subtitle          | string | No       | The page title that gets rendered above the sidebar navigation                                                                             |
| pageTitle         | string | No       | The string to be rendered in the page's `<title>` tag. If omitted, `siteName` will be used.                                                |
| baseDir           | string | No       | If your Gatsby site does not live in the root of your project directory/git repo, pass the subdirectory name here (`english`, for example) |
| gaTrackingId      | string | No       | Your site's Google Analytics tracking ID                                                                                                   |
| adSense           | string | No       | Your site's Google AdSense tracking ID                                                                                                     |
| baseUrl           | string | No       | The origin where your website will be hosted (e.g. `https://guitar-book.netlify.app`)                                                      |
| twitterHandle     | string | No       | Your Twitter handle, without the "@"                                                                                                       |
| youtubeUrl        | string | No       | The URL of your YouTube channel                                                                                                            |
| navConfig         | object | No       | An object defining the top-left navigation links (see [`navConfig` reference](#navconfig))                                                 |

### `navConfig`

The `navConfig` option should be an object keyed by link titles. The values should be objects with `description`, and `url` properties. Check out the [default theme options](./gatsby-theme-guitar-book/theme-options.js) for an example of the expected shape of this data.

Page URLs will be derived from the file paths of your Markdown. You can nest Markdown files within directories to create pages with additional path segments. You can overwrite this default path by adding a `slug` field to your Markdown frontmatter header.

## Component shadowing

You can customize a website using this theme further by taking advantage of component shadowing.

```js
import React from 'react';
import { Helmet } from 'react-helmet';

export default function SEO({ title, description, siteName }) {
  return (
    <Helmet>
      <link rel="icon" href="/path/to/custom-favicon.ico" />
      {/* other SEO tags (OpenGraph, Twitter, etc.) */}
    </Helmet>
  );
}
```

## Deployment

All apps sites will eventually be deployed into a subdirectory, as configured by the `pathPrefix` option&mdash;/shanties, for example.

## Examples

In `apps` directory you will find my 3 connected guitar-books (english, polish, shanties).

## SongTemplate

If you want to start with your own guitar check `template` directory with [tutorial how to start](apps/template/README.md).

> **Important note:** Guitar book always must have at least one .md **and** mdx file to build successfully.

> **Important note:** To build successfully project with gatsby-theme-guitar-book plugin you must init git in project and publish it with some provider (it can be private repo and no matter which provider).
