

function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };

var ARGS = require("args");
var LOCATOR = require("package/locator", "http://registry.pinf.org/cadorn.org/github/pinf/packages/common/");
var LAUNCHER = require("launcher", "http://registry.pinf.org/cadorn.org/github/pinf/packages/common/");
var PINF = require("pinf", "http://registry.pinf.org/cadorn.org/github/pinf/packages/common/");
var OS = require("os");
var UTIL = require("util");


var Launcher = exports.Launcher = function(pkg, options) {
    if (!(this instanceof exports.Launcher))
        return new exports.Launcher(pkg, options);
    this.construct(pkg, options);
}

Launcher.prototype = LAUNCHER.Launcher();



Launcher.prototype.launch = function(targetPackage, launchOptions) {

    var launchPath = targetPackage.getBuildPath().join("program");
    if(!launchPath.exists()) {
        throw new Error("No program found at: " + launchPath);
    }

    var descriptor = this.pkg.getDescriptor();
        platformLocator = descriptor.getPlatformLocatorForName("narwhal-rhino");

    var platform = PINF.getPlatformForLocator(platformLocator);

    var binPath = platform.getPath().join("bin", "jackup");
    if(!binPath.exists()) {
        throw new Error("jackup binary not found at: " + binPath);
    }

    var jackconfigPath = this.pkg.getBuildPath().join("program", "lib", "jackconfig.js");

    var args = launchOptions.args;
/*    
    var spec = descriptor.getPinfSpec();
    if(spec.launcher.args) {
        spec.launcher.args.forEach(function(arg) {
            args.push(arg);
        });
    }
*/

    var command = "export SEA=" + this.pkg.getBuildPath().join("program") + "; export PROGRAM_PATH=" + launchPath + "; " + binPath + " " + args.join(" ") + " " + jackconfigPath;
    OS.system(command);
}
