let alimento  = document.getElementById('Buscador');

const añadir = document.getElementById('AñadirAlimento');


const eliminar = document.getElementById('EliminarAlimento');

let tipo = document.getElementById('tipo');

const { getConnection } = require('C:/Users/34658/Desktop/MyBalance/src/js/database');
const conn = getConnection();
const  { app } = require('C:/Users/34658/Desktop/MyBalance/src/js/renderApp.js');


const { dbox } = require('C:/Users/34658/Desktop/MyBalance/src/js/popup');


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
   
    res.end(JSON.stringify(data));
    });
    });
    // port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
    app.listen(3000, function() {
    
    });



alimento.addEventListener('input', updateValue);

function updateValue(e) {
    eliminar.disabled = true;
    añadir.disabled = false;
}


alimento.addEventListener('change', updateValue2);

//arreglar lag
function updateValue2(e) {
    añadir.disabled = false;
    eliminar.disabled = true;
 
}



añadir.addEventListener("click", function() {
    try{
        var alim = alimento.value;
        var type = tipo.value;
        console.log(alimento);
        if(alimento.value != ""){  
            var sqlQueryAdmin = "INSERT INTO alimentos (alimento, tipo) VALUES (?,?)";
            conn.query(sqlQueryAdmin, [alim, type ], (error,result,fields) => {
                if(error){
                    dbox (error);
                }else{
                    dbox ("Alimento añadido correctamente. " + alim + " (" + type + ")" );
                }            
            
            });
 
            eliminar.disabled = false;
            alimento.value = "";

        }
                         
        }catch(error){
            dbox (error);
        }

      
    

  });



  
  eliminar.addEventListener("click", function() {
    try{
        if(alimento.value != ""){  
            var alim = alimento.value;
            var sqlQueryAdmin = "DELETE FROM alimentos WHERE alimento = ?";
            conn.query(sqlQueryAdmin, [alim], (error,result,fields) => {
                if(error){
                    dbox (error);
                }else{
                    dbox ("Alimento eliminado correctamente. "+ alim) 
        
                }            
            
            });
  
            añadir.disabled = false;
            alimento.value = "";

       
        }
                     
    }catch(error){
        dbox (error);
    }
  });


