const { getConnection } = require('./../..//src/js/database');

const conn = getConnection();


const  { app } = require('./../..//src/js/renderApp.js');




app.get('/search', function(req, res) {
conn.query('SELECT alimento FROM alimentos WHERE alimento LIKE "%' + req.query.term + '%"',
function(err, rows, fields) {
if (err) throw err;
var data = [];
for (i = 0; i < rows.length; i++) {
    if(i< 5){
        data.push(rows[i].alimento);
    }
    
}
console.log(JSON.stringify(data));
res.end(JSON.stringify(data));
});
});
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function() {

});




$(document).ready(function(){
    var param = window.location.search.substr(1);
    var listaNombres = param.split('=');
    var result = listaNombres[1];
    console.log(result);
    });




    /*

class Alimento {
    constructor(alimento) {
      this.alimento = alimento;
    }
}

var alimentos = [];


 //PARAMETRO GMAIL.. 

  
    const { getConnection } = require('./../../src/js/database');

    const conn = getConnection();


    function getAlimentos(){
        
        let sql = 'SELECT alimentos FROM alimentos';
        conn.query(sql, (error, results, fields) => {
        var alimentosArray = [];
        if (error) {
            return console.error(error.message);
        }else{
         
            for (let i = 0; i < results.length; i++) {
                alimentosArray.push(new Alimento(results[i]));
            }

            
        }

        return alimentosArray;
        });
    }
    

   


    function buscarAlimento() {
        let input = document.getElementById('Buscador').value
        input=input.toLowerCase();
       
          
        for (i = 0; i < alimentos.length; i++) { 
            if (!alimentos[i].innerHTML.toLowerCase().includes(input)) { 
                alimentos[i].style.display="none";
            }
            else {
                alimentos[i].style.display="list-item";                 
            }
        }
    }

    

*/