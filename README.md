Spin up keycloak
`docker-compose -f keycloak-postgres.yml up`
(port localhost:8080)

PC secret:
7z9Kzv1VwCMWjobPkO7iNI1L6pvXgpiO

MAC sercert:
cQA6mjqbMG5gW40v5Yyl3DmRE1EzCISm

localhost:3000 only

employee1 - password

http://localhost:8080/auth/realms/Demo-Realm/protocol/openid-connect/token

connecting:
https://medium.com/devops-dudes/securing-node-js-express-rest-apis-with-keycloak-a4946083be51

curl -X POST 'http://localhost:8080/auth/realms/Demo-Realm/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=password' \
 --data-urlencode 'client_id=ssr-nodejs' \
 --data-urlencode 'client_secret=7z9Kzv1VwCMWjobPkO7iNI1L6pvXgpiO' \
 --data-urlencode 'username=employee1' \
 --data-urlencode 'password=password'

{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1NHFyaXpSd3NRLWdWb25wTTZJd1lmVnozUThlTGFEOW83bGE5SWZ1dC1VIn0.eyJleHAiOjE2NDgyMjQ0NDEsImlhdCI6MTY0ODIyNDE0MSwianRpIjoiMjVhZjY3NTUtMzFjZC00Yzc4LTk0OTctNmFhYTgwODU3ZjY2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL0RlbW8tUmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYzAxZTllNWItNWY4MS00NGRhLTk2NzMtZjBmODAxM2I4NjNiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic3NyLW5vZGVqcyIsInNlc3Npb25fc3RhdGUiOiJmZjIzMWYwYy0wOGRkLTQ4NDEtODUwNi0wMWU3YjkxNWQ5YjkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiYXBwLWNsaWVudCIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1kZW1vLXJlYWxtIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJzc3Itbm9kZWpzIjp7InJvbGVzIjpbImNsaWVudCJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiZmYyMzFmMGMtMDhkZC00ODQxLTg1MDYtMDFlN2I5MTVkOWI5IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJlbXBsb3llZTEifQ.IC4U6Pd3133SjBWqLqoRIENdVMCfvmStTkVa_G0KExlhO2YZkKf0HWfrstgYKVl16yZzN0Oj4Eik-oadwJEojtQHwKRSs6YM0UoUqwa9ogjTLBsA7-QFxiN46_tivgsl5DphpmWZUDmT6be7haDCNYiLm-elUJYDyVtnzuvfr7JKD7PU0UajmKuDsO4TjIr0ojoHQyK5GMumCDP4d6vJLInNUxlAOI6PaUiWt6Bl-BO13r79zWNeTjqK91WH8p4aLTT8pmJto_p0EukOmgEhHsTltyXSTRTI3bKvtwg--ZAlFgRlYqc-zigXYAJ0rx64X5PguJgROzwjlsjisIX_eg","expires_in":300,"refresh_expires_in":1800,"refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIxYmNmZDEyMy1lZTcyLTRhZGItOGM1OS01NDBmMWZlNTVlNjEifQ.eyJleHAiOjE2NDgyMjU5NDEsImlhdCI6MTY0ODIyNDE0MSwianRpIjoiM2E5YjU2ZWYtNDFmZi00NjlkLTg0NzAtZDZkMWY0YzQ4ZmZiIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL0RlbW8tUmVhbG0iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvRGVtby1SZWFsbSIsInN1YiI6ImMwMWU5ZTViLTVmODEtNDRkYS05NjczLWYwZjgwMTNiODYzYiIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJzc3Itbm9kZWpzIiwic2Vzc2lvbl9zdGF0ZSI6ImZmMjMxZjBjLTA4ZGQtNDg0MS04NTA2LTAxZTdiOTE1ZDliOSIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6ImZmMjMxZjBjLTA4ZGQtNDg0MS04NTA2LTAxZTdiOTE1ZDliOSJ9.7Ii7yEJn25DZPXpw2uHSDEtVOIAI9qpDtgZWXRTiCts","token_type":"Bearer","not-before-policy":0,"session_state":"ff231f0c-08dd-4841-8506-01e7b915d9b9","scope":"email profile"}

<h1>universsr</h1>

<p>
<a href="https://github.com/borisding/universsr"><img src="https://img.shields.io/github/release/borisding/universsr.svg" alt="Release Version"></a>
<a href="https://raw.githubusercontent.com/borisding/universsr/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
<a href="https://travis-ci.org/borisding/universsr"><img src="https://travis-ci.org/borisding/universsr.svg?branch=master" alt="Travis CI Build"></a>
<a href="https://david-dm.org/borisding/universsr"><img src="https://david-dm.org/borisding/universsr/status.svg" alt="Dependencies"></a>
<a href="https://david-dm.org/borisding/universsr?type=dev"><img src="https://david-dm.org/borisding/universsr/dev-status.svg" alt="Dev Dependencies"></a>
</p>

**universsr** - Universal React web app boilerplate, powered by Node.js Express web framework as backend.

> ✨ The name - "universsr" is combination of _universal_ and _server-side rendering (SSR)_ acronym.

## Features

- Server-rendered [`react`](https://github.com/facebook/react) + [`react-frontload`](https://github.com/davnicwil/react-frontload) for async data loading.
- [`Express`](https://github.com/expressjs/express) - Node.js framework for backend work.
- Code splitting for server rendered components via [`loadable-components`](https://github.com/gregberge/loadable-components) library.
- Combination of [`babel`](https://github.com/babel/babel) and [`webpack`](https://github.com/webpack) enables writing next generation JavaScript and code optimization.
- [`webpack-hot-server-middleware`](https://github.com/60frames/webpack-hot-server-middleware) - hot reload for bundled file on server-side.
- Static route configuration with [`react-router-config`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config) for React Router.
- Sass as extension of CSS and [`PostCSS`](https://github.com/postcss/postcss) for transforming styles, as well as [CSS modules](https://github.com/css-modules/css-modules) implementation out of the box.
- Enforce convention and avoid errors with code linter and formatter. ([`eslint`](https://github.com/eslint/eslint), [`prettier`](https://github.com/prettier/prettier), [`stylelint`](https://github.com/stylelint/stylelint))
- Implement security good practices with Express [`helmet`](https://github.com/helmetjs/helmet) and [`hpp`](https://github.com/analog-nico/hpp) middlewares.
- Using [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer) to visualize size of webpack output files.
- Delightful testing with [`jest`](https://github.com/facebook/jest) framework for React components.
- SEO ready with [`react-helmet`](https://github.com/nfl/react-helmet) component to manage document head.
- [`husky`](https://github.com/typicode/husky) for better git commits experience.
- [`nodemon`](https://github.com/remy/nodemon) to monitor changes made on server-side and automatically restart server.

## Requirement

Before you proceed, please make sure your machine has met the following requirements:

| Dependency |   Version   |
| ---------- | :---------: |
| Node       | >= v12.13.0 |
| NPM        | >= v6.12.0  |

## Quick Start

i) Installation

```bash
# cloning git repository into `my-project` folder
git clone --depth=1 https://github.com/borisding/universsr.git my-project

# install project dependencies
cd my-project && npm install
```

ii) Running app

For **development**:

```bash
npm run dev
```

For **production**:

Copy `.env.development` to `./config` folder as `.env` for production usage:

```bash
cp config/.env.development config/.env
```

Change environment variables in `.env` to serve your app.

```bash
npm run build # or,
npm run build:analyze # to analyze built bundles

npm start
```

For **test**:

```bash
npm test
```

## Project Structure

Below is overview of project folder structure in this starter along with the short descriptions, respectively:

<details><summary>CLICK ME</summary>
<p>

```
├── app                         # contains all app source files
|  ├── client.js                # webpack's client entry
|  ├── components               # contains React components
|  ├── index.js                 # app main entry file
|  ├── middleware               # contains Express middleware, include server renderer
|  ├── pages                    # contains page components
|  ├── routes                   # contains react route's configuration
|  ├── server.js                # Express http server of the app
|  ├── services                 # services registered for react frontload api
|  ├── static                   # contains static files that used in components
|  └── theme                    # contains app styels and variables
├── babel.config.js             # default babel configuration object
├── bundler                     # contains webpack bundler config files
|  ├── webpack.client.js        # webpack config for client
|  ├── webpack.common.js        # webpack common config for both client/server
|  ├── webpack.compiler.js      # webpack compiler for client and dev server
|  └── webpack.server.js        # webpack config for server
├── config                      # contains environment variables
├── env.loader.js               # env variables loader with `dotenv` and `dotenv-expand`
├── index.js                    # app entry to expose app server
├── jest.config.js              # jest testing framework config file
├── package-lock.json           # package lock file
├── package.json                # required dependencies, scripts, etc
├── postcss.config.js           # PostCSS config file
├── prettier.config.js          # Prettier formatter config file
├── resources                   # contains other resources
|  ├── coverage                 # generated test coverage folder
|  ├── icons                    # contains icons for the app
|  ├── jest                     # jest related files such as mocks
|  └── logs                     # store genereated log files
├── stylelint.config.js         # stylelint config file
├── utils                       # util files for the app
|  ├── env.js                   # environment util
|  ├── index.js                 # entry file to re-export utils
|  ├── logger.js                # logger util for the app
|  └── paths.js                 # project defined paths
└── webpack.config.babel.js     # webpack config entry
```

</p>
</details>
<br>

## NPM Scripts

- The following are available scripts in the project to perform respective tasks;
- We can execute script by running: `npm run <script name here>`

<details><summary>CLICK ME</summary>
<p>

| Script Name     | Description                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `clean`         | Remove `build` folder and respective built files.                                                             |
| `build`         | Remove previous built files and build production ready files to be served.                                    |
| `build:analyze` | Same with `build` script, except it comes with webpack bundle analyzer to visualize size of the output files. |
| `dev`           | Start app server in development environment via nodemon.                                                      |
| `start`         | Start app server in production environment                                                                    |
| `test`          | Perform tests execution.                                                                                      |
| `test:update`   | Running tests with snapshots get updated on.                                                                  |
| `test:watch`    | Running tests with watch mode turned on.                                                                      |
| `test:coverage` | Running tests with coverage report output.                                                                    |
| `lint`          | Perform source code lint checks for JS, React and styles based on the ESLint and stylelint config.            |
| `lint:style`    | Perform lint checks for Sass style.                                                                           |
| `lint:js`       | Perform lint checks for JS and React.                                                                         |

</p>
</details>
<br>

**Environment Variables**

`dotenv` and `dotenv-expand` packages are used in conjunction with `webpack.DefinePlugin` plugin for managing environment variables. The entire logic can be found in `./env.loader.js` file. The .env file is loaded based on the defined `process.env.NODE_ENV` value:

| File name          | NODE_ENV    |    In Source Control    |
| ------------------ | ----------- | :---------------------: |
| `.env.test`        | test        |           Yes           |
| `.env.development` | development |           Yes           |
| `.env`             | production  | No (Need to create new) |

Defined custom environment variables can be accessed via `process.env.[VARIABLE_NAME]`, for in instance:

```js
process.env.PORT; // this will give us PORT value
```

## Changelog

All notable changes made to the project will be documented on [release page](https://github.com/borisding/universsr/releases). For new project, always using the latest version. This project adheres to [Semantic Versioning](http://semver.org/).

## License

[MIT](https://raw.githubusercontent.com/borisding/universsr/master/LICENSE)
