

function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };


var ContentLength = require("jack/contentlength").ContentLength,
    ContentType = require("jack/contenttype").ContentType,
    ShowExceptions = require("jack/showexceptions").ShowExceptions,
    Lint = require("jack/lint").Lint;

var FILE = require("file");
var STATIC = require("jack/static");
var JSON = require("json");
var UTIL = require("util");
var PACKAGES = require("packages");
// TODO: Once we can jackup an app with a using-package context we can use the "pinf-common" alias
var DESCRIPTOR = require("package/descriptor", "registry.pinf.org/cadorn.org/github/pinf/packages/common/master");
var PACKAGE = require("package", "registry.pinf.org/cadorn.org/github/pinf/packages/common/master");


var programPath = FILE.Path(system.env.PROGRAM_PATH);
var descriptor = DESCRIPTOR.PackageDescriptor(programPath.join("package.json"));


var app = function(env) {

    var path = env["PATH_INFO"];
    if(path=="/") {
        // determine index file based on launcher options
        if(descriptor.getPinfSpec().launcher.options && descriptor.getPinfSpec().launcher.options.indexPath) {
            path = "/" + descriptor.getPinfSpec().launcher.options.indexPath;
        } else {
            path = "/lib/index.html";
        }
    }

    var m = path.match(/^\/pinf\/@platforms\/([^\/]*)\/@using\/([^\/]*)\/@direct\/(.*)$/);
    if(m) {

dump(m);    
        var locator = descriptor.getPlatformLocatorForName(m[1]),
            platformPkgPath = FILE.Path(system.sea).join("using", locator.getTopLevelId());
        
print(locator.getTopLevelId());

dump("platformPkgPath: " + platformPkgPath);

        var pkg = PACKAGE.Package(platformPkgPath);
print("pkgPath: " + pkg.getPath());

dump(pkg.getDescriptor());

        locator = pkg.getDescriptor().getUsingLocatorForName(m[2]);

dump(locator);        

    }
    
    env["PATH_INFO"] = path;

    return STATIC.Static(function() {}, {
        "urls": [
            path
        ],
        "root": programPath
    })(env);
}

// The application.
exports.app = ShowExceptions(Lint(ContentType(ContentLength(app))));
