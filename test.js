var scores = require('./');
var should = require('should');

describe('scores-parser', function(){
  describe('#parseResults()', function(){
    it('should have items', function(done){
      scores({date: 'live'}, function(data) {
        data.should.have.not.length(0);
        done();
      });
    });
  });
});