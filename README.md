# fastzalgo

Makes a function asynchronous by wrapping it inside `process.nexTick`.
Similar to [dezalgo][dezalgo] but almost 3 times faster:

```
runDezalgo*10000000: 7553ms
runFastzalgo*10000000: 2845ms
```

The main difference from [dezalgo][dezalgo] is that **you must call the callback only once**.

## Usage

```js
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
```

## Install

```js
npm i fastzalgo -g
```

## License

MIT

[dezalgo]: http://npm.im/dezalgo
