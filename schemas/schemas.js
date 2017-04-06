var Ajv = require('ajv');
var schemas = require("./schemas.json");
function Schemas(){} 
Schemas.prototype.validateData = function(schemaName, data) {
    var ajv = new Ajv({allErrors: true});
    var validate = ajv.compile(schemas[schemaName]);
    var valid = validate(data);
    var result = {};
    if (!valid) {
        result.error = true;
        result.errors = validate.errors;
    } else {
        result.error = false;
        result.errors = null;
    }
    return result;
}
module.exports = Schemas;
