# UWrc Website

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

[![Build Status](https://travis-ci.com/UWrc/UWrc.github.io.svg?branch=src)](https://travis-ci.com/UWrc/UWrc.github.io)

### JS Frameworks Installation

Set up your local environment by installing all the required JS frameworks by using yarn.

```bash
$ yarn install
```

### Local Development

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

```bash
$ yarn start
```

If all JS frameworks are staged (from previous step) then `yarn start` should spin up a local dev instance at `http://localhost:3000`

### Build

This will generate the static website into the `build` folder. It's not necessary as pull requests to the main repository will kick off CI processes to deploy the website.

```bash
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

This last stage is for manual deployment to the master branch. It is not required if Travis-CI is set up appropriately as pull requests will automatically perform this command and build the src branch into static content and deploy on the master branch.

```bash
$ GIT_USER=UWrc yarn deploy
```
