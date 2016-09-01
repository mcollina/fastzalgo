'use strict'

const reusify = require('reusify')
const pool = reusify(Pony)

function fastzalgo (func) {
  const pony = pool.get()
  pony.func = func
  process.nextTick(pony.resync)
  return pony.dezalgo
}

function Pony () {
  this.next = null
  this.func = null
  this.sync = true

  var that = this

  this.dezalgo = function dezalgo () {
    var array = new Array(arguments.length)
    for (var i = 0; i < arguments.length; i++) {
      array[i] = arguments[i]
    }

    if (that.sync) {
      process.nextTick(callFunc, that, this, array)
    } else {
      callFunc(that, this, array)
    }
  }

  this.resync = function resync () {
    that.sync = false
  }
}

function callFunc (pony, me, array) {
  const func = pony.func
  pony.func = null
  pony.sync = true
  pool.release(pony)
  func.apply(me, array)
}

module.exports = fastzalgo
