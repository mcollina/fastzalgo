'use strict'

const test = require('tap').test
const fastzalgo = require('.')

test('make async', function (t) {
  t.plan(5)

  var isAsync = false
  var called = false

  function foo (a, b) {
    t.ok(isAsync, 'is async')
    t.equal(a, 'a')
    t.equal(b, 'b')
    called = true
  }

  fastzalgo(foo)('a', 'b')

  isAsync = true

  t.notOk(called, 'not called yet')
  process.nextTick(function () {
    t.ok(called, 'called now')
  })
})

test('do nothing if async', function (t) {
  t.plan(5)

  var isAsync = false
  var called = false

  function foo (a, b) {
    t.ok(isAsync, 'is async')
    t.equal(a, 'a')
    t.equal(b, 'b')
    called = true
  }

  process.nextTick(fastzalgo(foo), 'a', 'b')

  isAsync = true

  t.notOk(called, 'not called yet')

  process.nextTick(function () {
    t.ok(called, 'called now')
  })
})

test('make async maintaining this', function (t) {
  t.plan(6)

  var isAsync = false
  var called = false
  var ctx = {}

  function foo (a, b) {
    t.ok(isAsync, 'is async')
    t.equal(a, 'a')
    t.equal(b, 'b')
    t.equal(this, ctx, 'this is set correctly')
    called = true
  }

  const func = fastzalgo(foo)
  func.call(ctx, 'a', 'b')

  isAsync = true

  t.notOk(called, 'not called yet')
  process.nextTick(function () {
    t.ok(called, 'called now')
  })
})

test('do nothing if async but keep this', function (t) {
  t.plan(6)

  var isAsync = false
  var called = false
  var ctx = {}

  function foo (a, b) {
    t.ok(isAsync, 'is async')
    t.equal(a, 'a')
    t.equal(b, 'b')
    t.equal(this, ctx, 'this is set correctly')
    called = true
  }

  const func = fastzalgo(foo)

  process.nextTick(function () {
    func.call(ctx, 'a', 'b')
  })

  isAsync = true

  t.notOk(called, 'not called yet')

  process.nextTick(function () {
    t.ok(called, 'called now')
  })
})
