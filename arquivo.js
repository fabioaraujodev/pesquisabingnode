const fs = require('fs');
const contentFilePath = 'urlface.json'

function save(content){
    const contentString  = JSON.stringify(content);
   // console.log(contentFilePath);
   // console.log(content);
    return fs.appendFileSync(contentFilePath, content);
}

function load(){
    const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8');
    const contentJson = JSON.parse(fileBuffer);
    return contentJson;
}
module.exports = {
    save, 
    load
}