import tedious from 'tedious'

var Connection = tedious.Connection;  
    var config = {  
        server: 'otp-db-server.database.windows.net',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'ksadmin', //update me
                password: 'Passwor!'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'otpdb'  //update me
        }
    }; 
    var connection = new Connection(config);  
    // connection.on('connect', function(err) {  
    //     // If no error, then good to proceed.  
    //     console.log("Connected");  
    //     //executeStatement();  
    // });  
    
    connection.connect();
  
    var Request = tedious.Request;  
    var TYPES = tedious.TYPES;  
  
    
    export default connection;