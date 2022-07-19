const { getConnection } = require('./../../src/js/database');

const conn = getConnection();

const { app } = require('./../../src/js/renderApp.js');

const Comida = require('./../../src/js/comida');

const añadir = document.getElementById('Añadir');
var semana = document.getElementById("semana");
var cantidad = document.getElementById("Idcantidad");
var dia = document.getElementById("dia");
var comida = document.getElementById("comida");
var alimento = document.getElementById("Buscador");

let comidas = []



app.get('/search', function (req, res) {
    conn.query('SELECT alimento FROM alimentos WHERE alimento LIKE "%' + req.query.term + '%"',
        function (err, rows, fields) {
            if (err) throw err;
            var data = [];
            for (i = 0; i < rows.length; i++) {
                if (i < 5) {
                    data.push(rows[i].alimento);
                }

            }
            console.log(JSON.stringify(data));
            res.end(JSON.stringify(data));
        });
});
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function () {

});




$(document).ready(function () {
    var param = window.location.search.substr(1);
    var listaNombres = param.split('=');
    var result = listaNombres[1];
    console.log(result);

    //CARGAR TODOS LOS DATOS DEL USUARIO PARA EL PLAN


});

//Añade alimento-cantidad a la comida correspondiente
añadir.addEventListener("click", function () {

    try {
        if(alimento.value != ""){
            var tr;
            if(comidas.length < 1){
                comidas.push(new Comida(comida.value, dia.value,  (alimento.value + "-" + comida.value + "-" + dia.value) ,  Idcantidad.value, 1, 1));
              /*  tr = $('<tr/>');
                tr.append("<td class=\"table-warning\">" + results[i].nombre + "</td>");
                tr.append("<td class=\"table-warning\">" + results[i].email + "</td>");
                $('table').find('tbody').append(tr);*/
    
                var data2 = document.getElementById(comida.value + "-" + dia.value);
                data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida.value + "-" + dia.value + "-" + 1 + "\">"
                var data3 = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + 1)
                data3.innerHTML += "<button id = \"btn-drop-" + comida.value + "-"  + dia.value + "-" + 1 +  "-" + alimento.value + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                var data4 = document.getElementById("btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value)
                data4.innerHTML += alimento.value + " " + Idcantidad.value
                data3.innerHTML +=   "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida.value + "-"  + dia.value + "-" + 1 +  "-" + alimento.value + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida.value + "-"  + dia.value + "-" + 1 +  "-" + alimento.value + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "')\">Eliminar</a></li> </ul> </div>"
                           
            
             
             
            
            }else{
                var pos = -1
                //USAR MAP
                for(let i = 0; i< comidas.length; i++){
                    if(comidas[i].mismaComida(comida.value, dia.value)){
                        pos = i
                    }
                }
                if(pos != -1){
                    if(comidas[pos].añadirAlimento((alimento.value + "-" + comida.value + "-" + dia.value), Idcantidad.value)){
                        var data = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + comidas[pos].btn_group_width)
                        if(data.clientWidth > 250){
                            var data2 = document.getElementById(comida.value + "-" + dia.value);
                            data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn_group_width+1) + "\">"
                            document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn_group_width+1)).style.margin = "5px";
                            var data3 = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn_group_width+1))
                            data3.innerHTML += "<button id = \"btn-drop-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1) + "-" + alimento.value +  "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                            var data4 = document.getElementById("btn-drop-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1) + "-" + alimento.value)
                            data4.innerHTML += alimento.value + " " + Idcantidad.value
                            data3.innerHTML +=   "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida.value + "-"  + dia.value + "-" +  (comidas[pos].btn + 1) +  "-" + alimento.value + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida.value + "-"  + dia.value + "-" + + (comidas[pos].btn + 1) +  "-" + alimento.value + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida.value + "-" + dia.value + "-" + + (comidas[pos].btn + 1) + "-" + alimento.value + "')\">Eliminar</a></li> </ul> </div>"
                            comidas[pos].incrementBtn_group_width()
                            comidas[pos].incrementBtn()
                        }else{
                         
                            var data3 = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + comidas[pos].btn_group_width)
                            data3.innerHTML += "<p>&nbsp</p>"
                            data3.innerHTML += "<button id = \"btn-drop-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1)  + "-" + alimento.value + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                            var data4 = document.getElementById("btn-drop-" + comida.value + "-"  + dia.value + "-" +  (comidas[pos].btn + 1) + "-" + alimento.value)
                            data4.innerHTML += alimento.value + " " + Idcantidad.value
                            data3.innerHTML +=   "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida.value + "-"  + dia.value + "-" +  (comidas[pos].btn + 1) +  "-" + alimento.value + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida.value + "-"  + dia.value + "-" + + (comidas[pos].btn + 1) +  "-" + alimento.value + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida.value + "-" + dia.value + "-" + + (comidas[pos].btn + 1) + "-" + alimento.value + "')\">Eliminar</a></li> </ul> </div>"
                            comidas[pos].incrementBtn()
                        }
                    }else{
                        dbox("No puedes añadir el mismo alimento en la misma comida")
                    }
                

                }else{
                    comidas.push(new Comida(comida.value, dia.value, (alimento.value + "-" + comida.value + "-" + dia.value), Idcantidad.value, 1, 1))
                    var data2 = document.getElementById(comida.value + "-" + dia.value);
                    data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida.value + "-" + dia.value + "-" + 1 + "\">"
                    var data3 = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + 1)
                    data3.innerHTML += "<button id = \"btn-drop-" + comida.value + "-" + dia.value + "-" + 1  + "-" + alimento.value + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                    var data4 = document.getElementById("btn-drop-" + comida.value + "-"  + dia.value + "-" + 1 + "-" + alimento.value)
                    data4.innerHTML += alimento.value + " " + Idcantidad.value
                    data3.innerHTML +=   "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida.value + "-"  + dia.value + "-" + 1 +  "-" + alimento.value + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida.value + "-"  + dia.value + "-" + 1 +  "-" + alimento.value + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "')\">Eliminar</a></li> </ul> </div>"
                           
            
                }
            }

         

            Idcantidad.value = ""
            alimento.value = ""
        }
    } catch (error) {
        dbox(error)
    }

});


//PASAR COMO PARÁMETRO DIV?
function eliminarAlimento(id) {
    try{
        console.log(id)
        var dropdown_item_id = id.replace('btn-drop', 'dropdown-item')
        var dropdown_menu_id = id.replace('btn-drop', 'dropdown-menu')

        var dropdown_item = document.getElementById(dropdown_item_id)
        var dropdown_menu = document.getElementById(dropdown_menu_id )
        var btn_drop = document.getElementById(id)
    
        dropdown_item.remove()
        btn_drop.remove()
        dropdown_menu.remove()
        
        console.log(id)
        var array = id.split("-");

        comidas.forEach(comida => {
            if(comida.mismaComida(array[2] , array[3])){
                comida.eliminarAlimento(array[5] + "-" + array[2] + "-" + array[3])
            }
        });
        
       

      
        //my_map.delete(key)


        //BUSCAR EL ALIMENTO EN EL 
 
    }catch(error){
        dbox(error)
    }
   


    
}


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