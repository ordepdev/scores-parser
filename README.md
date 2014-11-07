# scores-parser [![Build Status](https://travis-ci.org/ordepdev/scores-parser.svg?branch=master)](https://travis-ci.org/ordepdev/scores-parser)

Extract soccer results from the web.

```
npm install -g scores-parser
```

# Format
``` js
[
    { status: 'FT', home: 'team 1', result: '2-0', away: 'team 2'},
    { status: 'HT', home: 'team 1', result: '0-1', away: 'team 2'},
    { status: '30"', home: 'team 1', result: '0-0', away: 'team 2'},
    { status: '18:00', home: 'team 1', result: '?-?', away: 'team 2'},
]
```

## Usage

``` js
var scores = require('scores-parser')

scores(function (data) {
    // handle results
})
```

## License

MIT