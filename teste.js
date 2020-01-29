var myArray = ['1','2',3,4]


var myArrayObj = [{
        'codInterprete': 1,
        'nomeInterprete' : 'Fabio'
    }, {
        'codInterprete': 2,
        'nomeInterprete': 'Bruno'
}];


myArrayObj.forEach(function(value){
  console.log(value['codInterprete']);
  console.log(value['nomeInterprete']);
});