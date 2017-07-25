// process.env.NODE_ENV = (process.env.NODE_ENV || 'development').trim();

const path = require('path');
const _debug = require('debug');

const debug = _debug('app:config:global');
const config = new Map();

// ------------------------------------
// Environment
// ------------------------------------
config.set('env', process.env.NODE_ENV);

// ------------------------------------
// User Configuration
// ------------------------------------
config.set('dir_src', './src');
config.set('dir_build', './build');
config.set('dir_public', './public');

config.set('webpack_port', 4000);

config.set('vendor_dependencies', [
  'babel-polyfill',
  'classnames',
  'react-dom',
  'react-helmet',
  'react-redux',
  'react-router',
  'react',
  'redux-saga',
  'redux',
  'whatwg-fetch',
]);

// ------------------------------------
// Project
// ------------------------------------
config.set('project_public_path', process.env.PROJECT_PATH || '/');

// ------------------------------------
// Utilities
// ------------------------------------
const paths = (() => {
  const base = [config.get('path_project')];
  const resolve = path.resolve;

  const project = (...args) => resolve.apply(resolve, [...base, ...args]);

  return {
    project,
    src: project.bind(null, config.get('dir_src')),
    build: project.bind(null, config.get('dir_build')),
    public: project.bind(null, config.get('dir_public')),
  };
})();

config.set('utils_paths', paths);
// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json');

config.set('vendor_dependencies', config.get('vendor_dependencies')
  .filter(dep => {
    if (pkg.dependencies[dep]) return true;

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.\n` +
      `Consider removing it from vendor_dependencies in ~/config/index.js`
    );
  })
);

export default config;
