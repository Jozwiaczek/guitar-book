# Guitar Book Template

> **Important note:** Guitar book always must have at least one .md **and** mdx file to build successfully.

> **Important note:** To build successfully project with gatsby-theme-guitar-book plugin you must init git in project and publish it with some provider (it can be private repo and no matter which provider).

## How to copy template into new project
1. Clone [guitar-book](https://github.com/Jozwiaczek/guitar-book) repository
2. Copy whole `template` directory from _apps/template_ into a new project
3. Setup `gatsby-config.js` based on [Instruction](../../README.md)
4. Test guitar book locally: (inside template directory)
    1. `yarn install` - Install dependencies
    2. `yarn dev` - Start app (It will open app in your default browser)
5. Deploy guitar book on [Netlify](https://www.netlify.com/):
    1. In Netlify dashboard create a new site from Git.
    2. Connect to Git Provider. (Choose Github)
    3. Pick the project where your new guitar book is located.
    5. Set build settings:
        1. Branch to deploy: `master`
        2. Build command: `yarn build`
        3. Publish directory: `public/`
    6. Press `Deploy site`
    7. Set Site name : (Navigate to: Settings --> General --> Site details --> Press _Change site name_)
    9. Deploy site:
        1. Navigate to Deploys section and press `Trigger deploy --> Deploy site`.
        2. After previous step, app should be deployed under link(green) placed in top of netlify dashboard.
9. Add information about new guitar book into your project main README.
    1. Copy the table below to the **root** project README.md (Copy form code view).

        | Module      | Status | Public URL |
        | ----------- | ------ | ---------- |
        | Guitar Book | <BADGE_LINK_FROM_NETLIFY> | <LINK_TO_APP> |
        
    2. Add status badge (Navigate in Netlify to: Settings --> General --> Status badges). 
        1. Copy link from netlify and paste into copied table (In _Status_ column).
    3. Add public link to deployed app.
    
> **Important note:** Remember that app must always have at least one .md **and** mdx file to build successfully. 

> **Important note:** Changes to the markdown source does not result in an automatic "hot reload" in the browser; it is necessary to reload the page manually in the browser to see it re-rendered. 
> Additionally, changes in `gatsby_config.js` require stopping the server and restarting with `yarn start` again

> **Note:** Due problems with running app locally sometimes removing `.cache` and `.public` directories can solve the problem. 

## How to add new song
Add your mdx file `example.mdx` into `./content` directory 
then add the filename to the `sidebarCategories` configuration field in `gatsby-config.js`.

To add a section in the sidebar, create a folder in `./content`, add the mdx files there add configuration `gatsby-config.js`.

```mdx
---
title: Hallelujah
description: Jeff Buckley
ytLink: https://www.youtube.com/watch?v=y8AWFf7EAc4 
---

import { Verse } from 'gatsby-theme-guitar-book';

<Verse text={`
[Intro]
C Am C Am
\n
[Verse 1]
  C                 Am
I heard there was a secret chord
     C                   Am
That David played and it pleased the lord
    F                G               C        G
But you don't really care for music, do you?
        C                  F           G
Well it goes like this the fourth, the fifth
    Am                 F
The minor fall and the major lift
    G            E7             Am
The baffled king composing hallelujah
\n
[Chorus]
     F           Am          F           C    G   C
Hallelujah, hallelujah, hallelujah, hallelu-u-u-u-jah ....
`}/>
```

Page URLs will be derived from the file paths of your Markdown. You can nest Markdown files within directories to create pages with additional path segments. You can overwrite this default path by adding a `slug` field to your Markdown frontmatter header.

### Example of adding songs files into project
```
root/
    gatsby.config.js
    content/
        example1.mdx
        section1/
            example2.mdx
```

```
// ./gatsby-config.js

...
sidebarCategories: {
    null: [
        'example1',
    ],
    'Section 1 Title': [
        'section1/example2',
    ]
}
...
```

### Adding .MDX
MDX is an authorable format that lets you seamlessly use JSX in your markdown documents. You can import components and export metadata.

> **Note:** Every .md files can transform into .mdx but, not the other way around.

```markdown
// ./content/exampleCustomButton.mdx

---
title: Example Custom Button
description: Building a simple application
---

import CustomButton from '../../src/components/CustomButton';
   
<CustomButton color='primary'>Custom Button with props</CustomButton>
```

## How to style app
To make any style changes navigate to [gatsby-theme-guitar-book](https://github.com/Jozwiaczek/guitar-book/tree/master/gatsby-theme-guitar-book) package.
You can customize app using this theme further by taking advantage of [component shadowing](https://www.gatsbyjs.org/docs/themes/shadowing/).

Every imported file/component in new app must be declared with the same name, directory structure and component export type as in theme package based on gatsby component shadowing approach.

### Layout
For editing layout components navigate to [components directory](https://github.com/Jozwiaczek/guitar-book/tree/master/gatsby-theme-guitar-book/src/components).

### Global styles
For editing global styles navigate to [styles directory](https://github.com/Jozwiaczek/guitar-book/tree/master/gatsby-theme-guitar-book/src/styles).

### Colors
For changes with site colors navigate to [colors.js](https://github.com/Jozwiaczek/guitar-book/tree/master/gatsby-theme-guitar-book/src/utils/colors.js)
