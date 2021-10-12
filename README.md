# UW Research Computing Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/44ad94a8-c61e-48c0-92c2-5ee9d604e4df/deploy-status)](https://app.netlify.com/sites/hyak/deploys)

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator. SVG logos provided using [VectorLogoZone](https://www.vectorlogo.zone) or [logosear.ch](https://logosear.ch). Using the offline search plugin from [@lelouch77](https://github.com/lelouch77/docusaurus-lunr-search).

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

### Code Contribution

1. Create a local branch using `git checkout -b feature/feature_name`. Try to be specific with naming and use either `bugfix` or `feature` to help guide the team in what they are looking at. 
2. Make your commits then push the branch to the central repository on Github (e.g., `git push origin mybranch`).
3. Use the Github website to manually create a pull request (PR) and document in more detail your changes. Tag a specific team member to review, if appropriate.
4. Once all necessary reviewing parties (minimum 1) review your code, perform a final review and either merge your code interactively through Github or using the Git CLI if you feel an interactive rebase is necessary for cleanup.
