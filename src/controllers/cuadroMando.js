let alimento  = document.getElementById('Buscador');

const añadir = document.getElementById('AñadirAlimento');


const eliminar = document.getElementById('EliminarAlimento');

let tipo = document.getElementById('tipo');

const { getConnection } = require('../../../src/database/database');
const conn = getConnection();
const  { app } = require('../../../src/controllers/expressApp.js');


const { dbox } = require('../../../src/views/js/popup');

const { selectAlimento, deleteAlimento, insertAlimento } = require('../../../src/models/alimentos')







$(function () {
    $("#Buscador").autocomplete({
      classes: {
        "ui-autocomplete": "highlight"
      },
      name: 'buscador',
      source: 'http://localhost:8000/api/searchAlimento?key=%QUERY',
      messages: {
        noResults: 'No se ha encontrado ningun alimento',

      },
      limit: 4
    });
  });



app.listen(8000, () => {
    console.log("Sever is Running");
})

app.get("/api/searchAlimento", (req, res) => {
    selectAlimento(
      conn,
      req.query.term,
      (result) => {
        res.json(result);
      }
    );
});


app.get("/api/deleteAlimento", (req, res) => {
    deleteAlimento(
      conn,
      req.query.alimento,
      (result) => {
        res.json(result);
      }
    );
});


app.get("/api/insertAlimento", (req, res) => {
    insertAlimento(
      conn,
      req.query,
      (result) => {
        res.json(result);
      }
    );
});






   


alimento.addEventListener('input', updateValue);

function updateValue(e) {
    eliminar.disabled = true;
    //añadir.disabled = true;
}


alimento.addEventListener('change', updateValue2);

//arreglar lag
function updateValue2(e) {
    añadir.disabled = true;
    //añadir.disabled = true;
    //eliminar.disabled = true;
 
}



añadir.addEventListener("click", function() {
    try{
        var alim = alimento.value;
        var type = tipo.value;
        console.log(alimento);
        if(alimento.value != ""){  
            let request = 'http://localhost:8000/api/insertAlimento?' 
            request += 'alimento=' + alim
            request += '&tipo=' + type

            $.getJSON(request).done(function (result) {
                dbox ("Alimento añadido correctamente. " + alim + " (" + type + ")" );
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
            var type = tipo.value;
            
            let request = 'http://localhost:8000/api/deleteAlimento?' 
            request += 'alimento=' + alim

            $.getJSON(request).done(function (result) {
                dbox ("Alimento añadido correctamente. " + alim + " (" + type + ")" );
            });
              
            añadir.disabled = false;
            alimento.value = "";

       
        }
                     
    }catch(error){
        dbox (error);
    }
  });


