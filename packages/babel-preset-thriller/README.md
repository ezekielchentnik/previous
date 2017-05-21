# babel-preset-thriller

This package includes the [Babel](https://babeljs.io) preset used by [Thriller](https://github/com/ezekielchentnik/thriller)

## Usage in Thriller Projects

The easiest way to use this configuration is with Thriller, which includes it by default. **You don’t need to install it separately in Thriller projects.**

## Usage Outside of Thriller

If you want to use this Babel preset in a project not built with Thriller, you can install it with the following steps.

First, [install Babel](https://babeljs.io/docs/setup/).

Then create a file named `.babelrc` with following contents in the root folder of your project:

  ```js
  {
    "presets": ["thriller"]
  }
  ```

This preset uses the `useBuiltIns` option with [transform-object-rest-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/), which assumes that `Object.assign` is available or polyfilled.
