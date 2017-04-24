var Client = require("node-rest-client").Client;
var promisify = require("promisify-node");
var CircularJSON = require('circular-json');
//Client = promisify(Client);
function HttpClient() {}
HttpClient.prototype.sendGetRequest = function(inputArgs) {
    var client = new Client();
    var req = client.get(inputArgs.apiURL, inputArgs.args,
        function(data, response) {
            return inputArgs.callback(null, data)
        });
    requestSensors(req, inputArgs)
}
HttpClient.prototype.sendPostRequest = function(inputArgs) {
    var client = new Client();
    var req = client.post(inputArgs.apiURL, inputArgs.args,
        function(data, response) {
            return inputArgs.callback(null, data)
        });
    requestSensors(req, inputArgs)
}
HttpClient.prototype.sendDeleteRequest = function(inputArgs) {
    var client = new Client();
    var req = client.delete(inputArgs.apiURL, inputArgs.args,
        function(data, response) {
            inputArgs.callback(null, data)
        });
    requestSensors(req, inputArgs)
}

function requestSensors(req, inputArgs) {
    req.on('error', function(err) {
        err = JSON.parse(CircularJSON.stringify(err));
        inputArgs.callback(err.code, null)
    });
    req.on('requestTimeout', function(req) {
        req.abort();
        var error = "Request timed out.";
        inputArgs.callback(error, null)
    });
    req.on('responseTimeout', function(res) {
        var error = "Response has expired";
        inputArgs.callback(error, null)
    });
}
module.exports = HttpClient;
