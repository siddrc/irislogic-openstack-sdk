var Client = require("node-rest-client").Client;
var promisify = require("promisify-node");
//Client = promisify(Client);
function HttpClient(){}
HttpClient.prototype.sendGetRequest = function(inputArgs){
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
        console.log('request error', err);
        inputArgs.callback(err, null)
    });
    req.on('requestTimeout', function(req) {
        console.log('request has expired');
        req.abort();
        inputArgs.callback(err, null)
    });
    req.on('responseTimeout', function(res) {
        console.log('response has expired');
    });
}
module.exports = HttpClient;