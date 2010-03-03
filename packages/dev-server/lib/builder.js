

function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };

var LOCATOR = require("package/locator", "http://registry.pinf.org/cadorn.org/github/pinf/packages/common/");
var BUILDER = require("builder", "http://registry.pinf.org/cadorn.org/github/pinf/packages/common/");
var PINF = require("pinf", "http://registry.pinf.org/cadorn.org/github/pinf/packages/common/");


var Builder = exports.Builder = function(pkg, options) {
    if (!(this instanceof exports.Builder))
        return new exports.Builder(pkg, options);
    this.construct(pkg, options);
}

Builder.prototype = BUILDER.Builder();


Builder.prototype.build = function(targetPackage, buildOptions) {

print("build dev server");

/*
    var descriptor = targetPackage.getControlPackage().getDescriptor(),
        platformLocator = descriptor.getPlatformLocatorForName("narwhal-rhino"),
        platform = PINF.getPlatformForLocator(platformLocator),
        targetBasePath = targetPackage.getPath(),
        sourcePath,
        targetPath;


    // link the jackup bin from rhino
    targetPath = targetBasePath.join("bin", "jackup");
    targetPath.dirname().mkdirs();
    sourcePath = platform.getPath().join("bin", "jackup");
    sourcePath.symlink(targetPath);

    // link lib files (to get access to /lib/jackconfig.js
    sourcePath = targetPackage.getControlPackage().getPath().join("lib");
    targetPath = targetBasePath.join("lib");
    sourcePath.symlink(targetPath);

    // link using packages
    sourcePath = targetPackage.getControlPackage().getBuildPath().join("raw", "using");
    targetPath = targetBasePath.join("using");
    sourcePath.symlink(targetPath);
*/

}
