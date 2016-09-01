'use strict'

function fastzalgo (func) {
  var sync = true

  process.nextTick(function () {
    sync = false
  })

  return function () {
    var array = new Array(arguments.length)
    for (var i = 0; i < arguments.length; i++) {
      array[i] = arguments[i]
    }

    if (sync) {
      array.unshift(func)
      process.nextTick.apply(null, array)
    } else {
      func.apply(null, array)
    }
  }
}

module.exports = fastzalgo
