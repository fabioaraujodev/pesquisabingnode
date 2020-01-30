let connection;
var oracledb = require('oracledb');

(async function() {
try{
   connection = await oracledb.getConnection({
        user : 'bd_fabio',
        password : '',
        connectString : 'ORAPROD1/D01BDAD'
   });
   console.log("Successfully connected to Oracle!")

   const result = await connection.execute(
    `SELECT *
     FROM sga_financeiro.robo
     WHERE cod_robo in :id`,
    [1],  // bind value for :id
  );
  console.log(result.rows);

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