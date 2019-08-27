// const nps_utils = require('nps-utils')

module.exports = {
  scripts: {
    default: 'nodemon init.js',
    prod: 'cross-env NODE_ENV=production nodemon init.js',
  },
}
