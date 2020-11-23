# Guitar Book Contentful Extensions

## About

Package `contentful-extensions` contains custom extensions dedicated for Contentful (HeadlessCMS).

## Getting stared

### Install dependencies

```shell script
yarn
```

### Login into contentful

These step requires access to your contentful account.
After the login step, script will download token into your local machine.

```shell script
yarn login
```

### Configure

It will synchronize your local project with selected contentful space.

```shell script
yarn configure
```

### Start

```shell script
yarn start
```

Remember to change url in contentful extension settings ->

```
// For chords-preview extension for song entities
http://localhost:1234 -> http://localhost:1234/#/chords-preview

// For wiki-text extension for Author entities
http://localhost:1234 -> http://localhost:1234/#/wiki-text
```

> **Important note:** Wiki-text requires the field with `name` id, for downloading description from wikipedia.
