var Watson      = require('../index.js');
var fs          = require('fs');
var astEquality = require('./helpers/ast-equality');
var recast      = require('recast');

describe('convert-computed-decorators', function () {

  it('correctly transforms a simple computed property', function () {
    var source = fs.readFileSync('./tests/fixtures/computed-decorators/simple-cp/old.js');
    var watson = new Watson();
    var newSource = watson._transformComputedDecorators(source);

    astEquality(newSource, fs.readFileSync('./tests/fixtures/computed-decorators/simple-cp/new.js'));
  });

});
