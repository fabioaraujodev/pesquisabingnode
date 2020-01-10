const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
const WebSearchAPIClient = require('azure-cognitiveservices-websearch');

let credentials = new CognitiveServicesCredentials('fdf481a871054576ae0a7d76871a7822');
let webSearchApiClient = new WebSearchAPIClient(credentials);

webSearchApiClient.web.search('belo facebook oficial').then((result) => {
    /*let properties = ["images", "webPages", "news", "videos"]; */
    let properties = ["webPages"]; 
  
    //  console.log(JSON.stringify(resultado));

    for (let i = 0; i < properties.length; i++) {
        if (result[properties[i]]) {
            console.log(result[properties[i]].value[0]['url']);
        } else {
            console.log(`No ${properties[i]} data`);
        }
    } 
}).catch((err) => {
    throw err;
})