'use strict'
var exports = module.exports = {};
var Client = require('node-rest-client').Client;
var authenticate = exports.authenticate = function(inputArgs, callback) {
    authenticateImpl(inputArgs, callback)
}

function authenticateImpl(inputArgs, callback) {
    var client = new Client();
    var data = inputArgs.data;
    var args = {
        data: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    };
    var req = client.post("http://" + inputArgs.host + ":5000/v2.0/tokens", args, function(dataFromAuthAPI, response) {
        var token = extractToken(dataFromAuthAPI)
        callback(null,token)
    });
    req.on('error', function(error) {
        console.log('request error', error);
        callback(error,null);
    });
    req.on('requestTimeout', function(req) {
        console.log('request has expired');
        req.abort();
        callback(error,null);
    });

    req.on('responseTimeout', function(res) {
        console.log('response has expired');
        callback(error,null);
    });

}

function extractToken(dataFromAuthAPI) {
    return dataFromAuthAPI.access.token.id;
}
