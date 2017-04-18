var chai = require('chai');
const chaiJWT = require('chai-jwt');
chai.use(chaiJWT);
var expect = chai.expect; 
var Authentication = require("../entities/keystone/authentication");

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
        inputArgs.callback = function(errors, token) {
            if (errors)
                console.log("Error:" +JSON.stringify(errors));
            else
                expect(token).to.be.a.jwt;
        }
        authentication.authenticate(inputArgs)
    });
});
