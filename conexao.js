let connection;
var oracledb = require('oracledb');

(async function() {
try{
   connection = await oracledb.getConnection({
        user : 'SGA_FINANCEIRO',
        password : 'SGA_FINANCEIRO',
        connectString : 'jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=ORAPROD1)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=D01BDAD)(FAILOVER_MODE=(TYPE=SELECT)(METHOD=BASIC))))'
   });
   console.log("Successfully connected to Oracle!")
} catch(err) {
    console.log("Error: ", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch(err) {
        console.log("Error when closing the database connection: ", err);
      }
    }
  }
})()