'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  KARA_DATABASE_ADDRESS: '""',
  GOOGLE_API_KEY: '"AIzaSyAAPo-I1OO9QmZYIAv6VrGN70WLvkrAcVQ"',
})
