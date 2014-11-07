var http    = require('http');
var pkg     = require('./package');
var through = require('through');
var trumpet = require('trumpet')();

var elements = [],
    json     = [];

function push (buf) {
  var data = buf.toString().trim();
  if (data !== '') {
    var imgIndex = data.indexOf('&');
    if (imgIndex > -1) {
      data = data.substr(0, imgIndex) + "'";
    }
    elements.push(data);
  }
};

parseResults = function (cb) {
  trumpet.selectAll('.fs *', function(el) {
    el.createReadStream().pipe(el.createWriteStream({outer: true}));
  });

  trumpet.selectAll('.fd *', function(el) {
    el.createReadStream().pipe(el.createWriteStream({outer: true}));
  });

  trumpet.selectAll('.fd', function (row) {
    row.createReadStream().pipe(through(push));
  });

  trumpet.selectAll('.fs', function (row) {
    row.createReadStream().pipe(through(push));
  });

  trumpet.selectAll('.fh', function (row) {
    row.createReadStream().pipe(through(push));
  });

  trumpet.selectAll('.fa', function (row) {
    row.createReadStream().pipe(through(push));
  });

  trumpet.once('end', function () {
    for (var i = 0; i < elements.length; i+=4) {
      json.push({
        status: elements[i],
        home:   elements[i+1],
        result: elements[i+2],
        away:   elements[i+3]
      });
    };

    cb(json);
  });

  http.get(pkg.feed, function(res) {
    var res = res.pipe(trumpet);
  });
}

module.exports = parseResults;