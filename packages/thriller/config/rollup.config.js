const fs = require('fs')
const config = require('./paths')
const path = require('path')
const babelPreset = require('../babel')
const babel = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')

// This is the Rollup configuration.
module.exports = (options) => {
  const pkg = JSON.parse(fs.readFileSync(path.resolve('package.json')))
  const babelRcPath = path.resolve('.babelrc')
  const hasBabelRc = fs.existsSync(babelRcPath)
  const mainBabelOptions = {
    babelrc: true,
    presets: []
  }
  if (hasBabelRc) {
    console.log('> Using .babelrc defined in your app root')
  } else {
    mainBabelOptions.presets.push(require.resolve('../babel'))
  }
  const deps = []
  if(pkg['dependencies']){
    deps.push(...Object.keys(pkg['dependencies']))
  }
  if(pkg['devDependencies']){
    deps.push(...Object.keys(pkg['devDependencies']))
  }
  return {
    banner: `
      require('${
        // Is source-map-support installed as project dependency, or linked?
        ( require.resolve('source-map-support').indexOf(process.cwd()) === 0 )
          // If it's resolvable from the project root, it's a project dependency.
          ? 'source-map-support/register'
          // It's not under the project, it's linked via lerna.
          : require.resolve('source-map-support/register')
      }')
    `,
    entry: `${config.serverSrcPath}/index.js`,
    external (id) {
       if (/babel-runtime\/.*/i.test(id)) {
           return true
       }
       return deps.indexOf(id) > -1
    },
    onwarn (warning) {
        if (warning.code === 'THIS_IS_UNDEFINED') {
            return
        }
        console.log(warning.message)
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(options.env),
        '__DEV__': options.env === 'development'
      }),
      json(),
      commonjs({
        include: [config.userNodeModulesPath, path.resolve(__dirname, '../node_modules')],
        extensions: [ '.js', '.json' ]
      }),
      babel(Object.assign({ runtimeHelpers: true }, mainBabelOptions))
    ],
    targets: [
      {
        sourceMap: true,
        format: 'cjs',
        dest: `${config.serverBuildPath}/main.js`
      }
    ]
  }
}
