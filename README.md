# shortcode_processing [![Build Status](https://travis-ci.org/binary-com/shortcode_processing.svg?branch=master)](https://travis-ci.org/binary-com/shortcode_processing)
This project is used for converting [**Binary.com**](https://www.binary.com) provided short-code to long-code.

# Usage:
If you have `npm` installed, use:
```
$ npm install binary-com-longcode --save
```
For `yarn`, use:
```
$ yarn add binary-com-longcode
```

In code: 
```
import {Longcode} from 'binary-com-longcode';

const longcodeGenerator = new Longcode(active_symbols, language, currency);
console.log(longcodeGenerator.get('some_short_code'));

```
Or:
```
var longcode = require('binary-com-longcode').Longcode;
var longcodeGenerator = new Longcode(active_symbols, language, currency);

console.log(longcodeGenerator.get('some_short_code'));
```

Use with proposal object:
----
To use it with proposal object please pass the raw response from the api to the function, eg:
```
var longcode = require('binary-com-longcode').Longcode;
var longcodeGenerator = new Longcode(active_symbols, language, currency);
console.log(longcodeGenerator.get(proposal_response));
```
> Note: For successful release update the `version` in **package.json**
