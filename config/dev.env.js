'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GOOGLE_API_KEY: '"AIzaSyAAPo-I1OO9QmZYIAv6VrGN70WLvkrAcVQ"',
  FIREBASE_API_KEY: '"AIzaSyA24qHJ6tYAqJKJkRz77-Uo5oOAdhX_nAc"',
  FIREBASE_AUTH_DOMAIN: '"kara-upload-app.firebaseapp.com"',
  FIREBASE_DATABASE_URL: '"https://kara-upload-app.firebaseio.com"',
  FIREBASE_PROJECT_ID: '"kara-upload-app"',
  FIREBASE_STORAGE_BUCKET: '"kara-upload-app.appspot.com"',
  FIREBASE_MESSAGING_SENDER_ID: '"219408936184"',
})
