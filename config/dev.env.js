'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GOOGLE_API_KEY: '"AIzaSyAAPo-I1OO9QmZYIAv6VrGN70WLvkrAcVQ"',
  FIREBASE_API_KEY: '"AIzaSyDMYo_bAJB7wUVMMG5Mehaopy7P0EQWLNc"',
  FIREBASE_AUTH_DOMAIN: '"kara-1a295.firebaseapp.com"',
  FIREBASE_DATABASE_URL: '"https://kara-1a295.firebaseio.com"',
  FIREBASE_PROJECT_ID: '"kara-1a295"',
  FIREBASE_STORAGE_BUCKET: '"kara-1a295.appspot.com"',
  FIREBASE_MESSAGING_SENDER_ID: '"1094511591298"',
})
