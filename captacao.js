const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
const WebSearchAPIClient = require('azure-cognitiveservices-websearch');

let credentials = new CognitiveServicesCredentials('41c8f53364de4a00b9c2c21c1317a9b7');
let webSearchApiClient = new WebSearchAPIClient(credentials);

let interpretes = require('./interprete.js');
let locais = require('./local.js');
const arquivo = require('./arquivo.js');
let textoPesquisa = '';
const content = {

   }

function captacaoInterprete() {
    for (var i = 0; i <=5; i++) {
             console.log(interpretes[i]['cod_robo_interprete']);
             console.log(interpretes[i]['nom_interprete']);
           // console.log("-- "+i);   
            buscar(interpretes[i]['nom_interprete'], interpretes[i]['cod_robo_interprete']);

    }
}

function captacaoLocal() {
    
    console.log(locais.length);
    //console.log(locais);
    for (var i = 0; i < locais.length; i++) {
           //  console.log(locais[i]['cod_robo_local']);
           //  console.log(locais[i]['dsc_nome']);
           // console.log("-- "+i);   
           textoPesquisa = locais[i]['dsc_nome']+ ' '+ locais[i]['dsc_municipio'] + ' '+  locais[i]['dsc_uf'] +' ' ;
            buscar(textoPesquisa, locais[i]['cod_robo_local']);

    }
    console.log('ACABOU!');
}

console.log('comecou...');
//captacao() ;
captacaoLocal();
//captacaoInterprete() ;


function checkFacebook(obj) {
    return obj.url.includes('facebook.com');
} 

 function buscar(itemPesquisa, cod_int) {
    
    let result =  webSearchApiClient.web.search(itemPesquisa + ' facebook ').then((result) => {
            /*let properties = ["images", "webPages", "news", "videos"]; */
            let properties = ["webPages"]; 
            //  console.log(JSON.stringify(resultado));
            for (let n = 0; n < properties.length; n++) {
                if (result[properties[n]]) {
                    //await addArquivo(itemPesquisa, "insert into SGA_FINANCEIRO.ROBO_FONTE_URL (COD_ROBO_FONTE_URL, DSC_URL, COD_ROBO_FONTE, IND_STATUS, COD_ROBO_INTERPRETE) VALUES (SEQ_ROBO_FONTE_URL.NEXTVAL, '"+ result[properties[n]].value[0]['url']+"' , 257, 'A', "+cod_int+");") ;  
                    //const content = await arquivo.load();
                    //console.log(result[properties[n]]);
                    //console.log('===============================================');
                    let obj = (result[properties[n]].value.find(checkFacebook));  
                   // console.log(obj);
                    if ((obj) && (obj['url'] !== 'https://www.facebook.com/'))  { 
                      //console.log(itemPesquisa);  
                      //console.log(obj['url']);
                      content.searchTerm = itemPesquisa;
                      content.prefix = "insert into SGA_FINANCEIRO.ROBO_FONTE_URL (COD_ROBO_FONTE_URL, DSC_URL, COD_ROBO_FONTE, IND_STATUS, DAT_CADASTRO, COD_ROBO_LOCAL) VALUES (SGA_FINANCEIRO.SEQ_ROBO_FONTE_URL.NEXTVAL, '"+ obj['url']+"' , 317, 'X', sysdate, "+cod_int+");" + "\r\n";
                      arquivo.save(content.prefix);    
                    } else {
                        console.log('ERRADO:   ' + obj['url']);
                    }

                    //content.prefix = "insert into SGA_FINANCEIRO.ROBO_FONTE_URL (COD_ROBO_FONTE_URL, DSC_URL, COD_ROBO_FONTE, IND_STATUS, COD_ROBO_INTERPRETE) VALUES (SEQ_ROBO_FONTE_URL.NEXTVAL, '"+ result[properties[n]].value[0]['url']+"' , 257, 'A', "+cod_int+");" + "\r\n";
                   
                    //console.log(result[properties[0]].value[n]['url']);
                    //console.log("insert into SGA_FINANCEIRO.ROBO_FONTE_URL (COD_ROBO_FONTE_URL, DSC_URL, COD_ROBO_FONTE, IND_STATUS, COD_ROBO_LOCAL) VALUES (SEQ_ROBO_FONTE_URL.NEXTVAL, '"+ result[properties[n]].value[0]['url']+"' , 317, 'X', "+cod_int+");") ;
                    // console.log(" --- save---");                     
                } else {
                    // console.log('Não ${properties[n]} ');
                }   
            }

    } ).catch((err) => {
        throw err;
    })
}

