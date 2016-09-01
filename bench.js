'use strict'

const bench = require('fastbench')
const dezalgo = require('dezalgo')
const fastzalgo = require('.')

bench([
  function runDezalgo (cb) {
    dezalgo(cb)()
  },
  function runFastzalgo (cb) {
    fastzalgo(cb)()
  }
], 10000000)()
