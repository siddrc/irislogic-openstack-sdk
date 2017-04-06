var chai = require('chai');
const chaiJWT = require('chai-jwt');
chai.use(chaiJWT);
var expect = chai.expect; // we are using the "expect" style of Chai
var Authentication = require("../entities/keystone/authentication");
//var restartServer = require("../entities/servers");

describe('Authenticate', function() {
    it('authenticate() should return a valid JWT token', function() {
        var authentication = new Authentication();
        var inputArgs = {};
        inputArgs.openStackHost = "54.227.13.130";
        inputArgs.protocol = "http";
        inputArgs.auth = {
            "auth": {
                "tenantName": "admin",
                "passwordCredentials": {
                    "username": "admin",
                    "password": "irislogic@007"
                }
            }

        }
        inputArgs.callback = function(error, token) {
            expect(token).to.be.a.jwt;   
        }
        authentication.authenticate(inputArgs)
    });
});
