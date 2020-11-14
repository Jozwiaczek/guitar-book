# Guitar Book Song Template

## How to copy template into new project

1. Clone [guitar-book](https://github.com/Jozwiaczek/guitar-book) repository
2. Copy whole `template` directory from _apps/template_ into a new project
3. Setup `gatsby-config.js` based on [Instruction](../../README.md) (Not required to start app)
4. Test guitar book locally: (inside template directory)
   1. `yarn install` - Install dependencies
   2. `yarn dev` - Start app (It will open app in your default browser)
5. Deploy guitar book on [Netlify](https://www.netlify.com/):
   1. In Netlify dashboard create a new site from Git.
   2. Connect to Git Provider. (Choose Github)
   3. Pick the project where your new guitar book is located.
   4. Set build settings:
      1. Branch to deploy: `master`
      2. Build command: `yarn build`
      3. Publish the directory: `public/`
   5. Press `Deploy site`
   6. Set Site name : (Navigate to: Settings --> General --> Site details --> Press _Change site name_)
   7. Deploy the site:
      1. Navigate to Deploys section and press `Trigger deploy --> Deploy site`.
      2. After the previous step, app should be deployed under link(green) placed in top of netlify dashboard.
6. Add information about new guitar book into your project main README.

   1. Copy the table below to the **root** project README.md (Copy form code view).

      | Module      | Status                    | Public URL    |
      | ----------- | ------------------------- | ------------- |
      | Guitar Book | <BADGE_LINK_FROM_NETLIFY> | <LINK_TO_APP> |

   2. Add status badge (Navigate in Netlify to: Settings --> General --> Status badges).
      1. Copy link from netlify and paste into the copied table (In _Status_ column).
   3. Add a public link to deployed app.

> **Important note:** Additionally, changes in `gatsby_config.js` require stopping the server and restarting with `yarn start` again

> **Note:** Due problems with running app locally sometimes removing `.cache` and `.public` directories can solve the problem.

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
