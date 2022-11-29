import connection from '../config/azure.sql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import tedious from 'tedious'
import OTP_QUERY from '../query/otp.query.js';

const HttpStatus = {
    OK: {code: 200, status: 'OK'},
    CREATED: {code: 201, status: 'CREATED'},
    NO_CONTENT: {code: 204, status: 'NO_CONTENT'},
    BAD_REQUEST: {code: 400, status: 'BAD_REQUEST'},
    NOT_FOUND: {code: 404, status: 'NOT_FOUND'},
    INTERNAL_SERVER_ERROR: {code: 500, status: 'INTERNAL_SERVER_ERROR'}
}

var Request = tedious.Request;
var TYPES = tedious.TYPES;  
export const createOtprecord = (req, res) => {
        var request = new Request
    (OTP_QUERY.CREATE_OTPRECORD, function(err) { 
    if (err) {  
        console.log(err);}  
    });  
    request.addParameter('id', TYPES.Int,Object.values(req.body)[0]);  
    request.addParameter('first_name', TYPES.NVarChar,Object.values(req.body)[1]); 
    request.addParameter('last_name', TYPES.NVarChar,Object.values(req.body)[2]); 
    request.addParameter('email', TYPES.NVarChar,Object.values(req.body)[3]); 
    request.addParameter('phone', TYPES.NVarChar,Object.values(req.body)[4]); 


    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            console.log("otp record inserted with item id: " + column.value);  
            res.status(HttpStatus.CREATED.code)
            .send(new Response(HttpStatus.CREATED.code, HttpStatus.OK.status,`otp record inserted with item id:`, {columns}))
          }  
        });  
    });
    
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);

}