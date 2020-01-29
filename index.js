let connection;
var oracledb = require('oracledb');

const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
const WebSearchAPIClient = require('azure-cognitiveservices-websearch');

let credentials = new CognitiveServicesCredentials('fdf481a871054576ae0a7d76871a7822');
let webSearchApiClient = new WebSearchAPIClient(credentials);

(async function() {
    try{
       connection = await oracledb.getConnection({
            user : 'SGA_FINANCEIRO',
            password : 'SGA_FINANCEIRO',
            connectString : 'DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=scan-prd03)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=BDAD)(FAILOVER_MODE=(TYPE=SELECT)(METHOD=BASIC))))'

       });
       console.log("Successfully connected to Oracle!");
       teste();
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


  function teste() {  
    connection.execute(
    'SELECT * FROM SGA_FINANCEIRO.ROBO_INTERPRETE',
    [],  
   function(err, result) {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log(result.rows);
   });
} 

/*
webSearchApiClient.web.search('ivete sangalo').then((result) => {
    let properties = ["webPages"];
    for (let i = 0; i < properties.length; i++) {
        if (result[properties[i]]) {
            console.log(result[properties[i]].value);
            inserirRoboInterprete();
        } else {
            console.log(`No ${properties[i]} data`);
        }
    }
}).catch((err) => {
    throw err;
})



function inserirRoboInterprete(seq, nome) {
const sqlQuery = `INSERT INTO SGA_FINANCEIRO.ROBO_INTERPRETE VALUES (:1, :2)`;

binds = [ ["test001", "test001@email.com" ], 
          ["test002", "test002@email.com" ], 
          ["test003", "test003@email.com" ]];

result = await connection.executeMany(sqlQuery, binds, {});

console.log("Number of inserted rows:", result.rowsAffected);
} 

function inserirRoboFonteURL() {
const sqlQuery = `INSERT INTO SGA_FINANCEIRO.ROBO_FONTE_URL VALUES (:1, :2)`;

binds = [ ["test001", "test001@email.com" ], 
          ["test002", "test002@email.com" ], 
          ["test003", "test003@email.com" ]];

result = await connection.executeMany(sqlQuery, binds, {});

console.log("Number of inserted rows:", result.rowsAffected);
} 

*/

