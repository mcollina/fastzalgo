'use strict'

const zalgo = require('.')

const print = console.log
const asyncPrint = zalgo(console.log)

asyncPrint('this happens after')
print('this happens before')

// Prints:
//
// this happens before
// this happens after
