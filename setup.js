var wd = require("wd");

require('colors');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// var mocha = new Mocha({
//     reporter: 'mochawesome',
//     reporterOptions: {
//         reportFilename: 'customReportFilename',
//         quiet: true
//       }
//   });

exports.should = should;