'use strict'
var Constants = require("../../constants/constants");
var HttpClient = require("../../http/httpclient")
var Schemas = require("../../schemas/schemas");

function Authenticate() {}
Authenticate.prototype.authenticate = function(inputArgs) {
    var validSchema = validateRequestSchema(inputArgs);
    if (!validSchema.error) {
        authenticateImpl(inputArgs)
    } else {
        inputArgs.callback(validSchema.errors, null);
    }
}

function validateRequestSchema(inputArgs) {
    var schemas = new Schemas();
    var validSchema = schemas.validateData("authenticateSchema", inputArgs);
    return validSchema;
}

function authenticateImpl(inputArgs) {
    var constants = new Constants();
    var data = inputArgs.auth;
    var args = {
        data: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    };
    var anotherInputArgs = {};
    anotherInputArgs.data = data;
    anotherInputArgs.args = args;
    anotherInputArgs.apiURL = inputArgs.protocol + "://" + inputArgs.openStackHost + ":" + constants.getNovaPort() + "/v2.0/tokens/";
    var httpclient = new HttpClient();
    anotherInputArgs.callback = function(error, tokenData) {
        var token = extractToken(tokenData);
        if (token === null) {
            var error = {
                msg: "Token was returned as null"
            }
            inputArgs.callback(error, null)
        } else {
            inputArgs.callback(null, token);
        }


    }
    httpclient.sendPostRequest(anotherInputArgs);
}

function extractToken(data) {
    if (data !== null)
        return data.access.token.id;
    else
        return null;
}
module.exports = Authenticate;
