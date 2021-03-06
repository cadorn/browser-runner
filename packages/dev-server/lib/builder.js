

function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };

var LOCATOR = require("package/locator", "http://registry.pinf.org/cadorn.org/github/pinf/packages/common/");
var BUILDER = require("builder", "http://registry.pinf.org/cadorn.org/github/pinf/packages/common/");
var PINF = require("pinf", "http://registry.pinf.org/cadorn.org/github/pinf/packages/common/");
var SUPER_BUILDER = require("builders/program-package", "http://registry.pinf.org/cadorn.org/github/pinf/packages/common/");


var Builder = exports.Builder = function(pkg, options) {
    if (!(this instanceof exports.Builder))
        return new exports.Builder(pkg, options);
    this.construct(pkg, options);
}

Builder.prototype = BUILDER.Builder();


Builder.prototype.build = function(targetPackage, buildOptions) {

    // NOTE: This is the same as if no builder is declared at all in package.json
    var builder = SUPER_BUILDER.Builder(this.pkg, this.options);
    builder.build(targetPackage, buildOptions);

}
