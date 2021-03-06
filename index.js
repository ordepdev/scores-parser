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

parseResults = function (options, cb) {
  var url = pkg.feed;
  if(options && options.date) {
    url += '/soccer/' + options.date + '/';
  }
  
  trumpet.selectAll('.row-gray *', function(el) {
    el.createReadStream().pipe(el.createWriteStream({outer: true}));
  });

  trumpet.selectAll('.min', function (row) {
    row.createReadStream().pipe(through(push));
  });

  trumpet.selectAll('.ply', function (row) {
    row.createReadStream().pipe(through(push));
  });

  trumpet.selectAll('.sco', function (row) {
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

  http.get(url, function(res) {
    res.pipe(trumpet);
  });
}

module.exports = parseResults;
