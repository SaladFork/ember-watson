var recast   = require('recast');
var builders = recast.types.builders;
var types    = recast.types.namedTypes;

module.exports = function transform(source) {
  var ast = recast.parse(source);

  var computedProperties = [];

  recast.visit(ast, {
    visitCallExpression: function(path) {
      var node = path.node;

      if (isComputedProperty(node)) {
        computedProperties.push(path);
      }

      this.traverse(path);
    }
  });

  computedProperties.forEach(transformComputedProperty);

  return recast.print(ast, { tabWidth: 2, quote: 'single' }).code;
};

function isComputedProperty(node) {
  return types.MemberExpression.check(node.callee) &&
         types.Identifier.check(node.callee.property) &&
         node.callee.property.name === 'computed';
}

function transformComputedProperty(path) {
  // Path is the NodePath for a CallExpression
  console.log(path);
  var node = path.node;

  // The function that is inside the computed. We graph the last one in the
  // array as there may be dependent keys before it
  // TODO: Deal with { get(), set() }
  var computedFunction = node.arguments[node.arguments.length - 1];

  // TODO: Add `@computed` decorator

  // console.log(computedFunction);

  path.replace(computedFunction);
}
