'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  IPFS_GATEWAY_URL: '',
  KARA_CONTRACT_ADDRESS: ''
})
