/**
 * Module loader should ignore commented calls on require
 var test = require("fake");
 */

var BAR = require("./bar");

exports.hi = function() {

    return "Hello World from foo.js and bar.js: " + BAR.msg;

}
