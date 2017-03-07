'use strict'
var exports = module.exports = {};
var keystone = require("./entities/keystone");
console.log("test in index.js "+keystone.authentication.authenticate());
exports.keystone = keystone;