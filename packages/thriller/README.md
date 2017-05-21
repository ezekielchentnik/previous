# Thriller
Thriller is an easy peasy build system for Node.js micro-services on top of [Rollup](https://github.com/rollup/rollup).  Thriller lets you create modern Node.js apps and services with zero config. Thriller handles all the watching, reloading, transpiling, and bundling for you. It comes with a few `healthy` defaults and support for modern JS features.  Everything can be customized and you can easily add Thriller to your existing Node.js project with just a single dependency, batteries included.  Inspired by backpack, nuxt.js, next.js, and create-react-app

## Features

- Zero-config, one dependency
- Latest ES6 features (module syntax, async/await, object rest spread)
- Live reloading

## How to use

Install it:

```bash
npm i thriller --save
```

Add an npm script to your package.json:

```json
{
  "scripts": {
    "dev": "thriller"
  }
}
```

Make sure `src/index.js` is the entry of your app.

Run your application in development mode:

```bash
npm run dev
```

### Custom configuration

For custom advanced behavior, you can create a `thriller.config.js` in the root of your project's directory (next to `package.json`).

```js
module.exports = {
  /* config options here */
}
```

### Customizing rollup config

[Example](https://github.com/ezekielchentnik/thriller/examples)  

To extend webpack, you can define a function that extends its config via `thriller.config.js`.

```js
// thriller.config.js
module.exports = {
  rollup: (config, options, rollup) => {
    // Perform customizations to config
    // Important: return the modified config
    return config
  }
}
```

### Customizing babel config

[Example](https://github.com/ezekielchentnik/thriller/examples)   

To extend our usage of `babel`, you can define a `.babelrc` file at the root of your app. This file is optional.

If found, Thriller will consider it to be the `defacto` babel config, it will also need Thriller's preset `thriller/babel`.

Here's an example `.babelrc`:

```js
{
  "presets": [
    "thriller/babel",
    "stage-0"
  ]
}
```

### Building for Production

Add a npm script for the build step:

```json
{
  "scripts": {
    "dev": "thriller",
    "build": "thriller build"
  }
}
```

Then run the build command and start your app

```bash
npm run build
node ./build/main.js
```

## CLI Commands

### `thriller dev`
Runs thriller in development mode.  

Your code will reload if you make edits.  

### `thriller build`
Builds the app for production to the `build` folder.  
It correctly bundles your production mode and optimizes the build for the best performance.

You can run your production application with the following command:

```bash
node ./build/main.js
```

Your application is ready to be deployed!

## Inspiration
- [backpack-core](https://github.com/palmerhq/backpack)
- [nuxt.js](https://github.com/nuxt)
- [zeit/next.js](https://github.com/zeit/next.js)
