'use strict'

const test = require('tap').test
const fastzalgo = require('.')

test('make async', function (t) {
  t.plan(3)

  var isAsync = false
  var called = false

  function foo () {
    t.ok(isAsync, 'is async')
    called = true
  }

  fastzalgo(foo)()

  isAsync = true

  t.notOk(called, 'not called yet')
  process.nextTick(function () {
    t.ok(called, 'called now')
  })
})

test('do nothing if async', function (t) {
  t.plan(3)

  var isAsync = false
  var called = false

  function foo () {
    t.ok(isAsync, 'is async')
    called = true
  }

  process.nextTick(fastzalgo(foo))

  isAsync = true

  t.notOk(called, 'not called yet')

  process.nextTick(function () {
    t.ok(called, 'called now')
  })
})
