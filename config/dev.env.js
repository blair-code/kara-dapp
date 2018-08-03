'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IPFS_GATEWAY_URL: 'http://localhost:8080/ipfs/',
  KARA_CONTRACT_ADDRESS: ''
})
