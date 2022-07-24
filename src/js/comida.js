const { select } = require("async")

module.exports = class Comida {

   

    constructor (tipo, dia, alimento, cantidad, btn_group_width, btn) {
      this._sqlCommand = ""
      this._semana = 0
      this._btn_group_width = 0
      this._btn  = 0
      this.alimentos = new Map();
      this._tipo = tipo;
      this._dia = dia;
      this.alimentos.set(alimento,cantidad);
      this._btn_group_width = btn_group_width
      this._btn = btn
    }

    añadirAlimento(alimento, cantidad){
      console.log("entra")
      var añadido = true
      if(this.alimentos.get(alimento) != undefined){
        console.log("repe")
        añadido = false
       
      }else{
        this.alimentos.set(alimento,cantidad);
        añadido = true
        console.log("ok")
        

      }

      return añadido
      
    }

    eliminarAlimento(alim){
      console.log(alim)
      this.alimentos.forEach( (cantidad, alimento, map) => {
        console.log(alimento + " " + cantidad) // pepino: 500 etc
      });
    
      this.alimentos.delete(alim)

      this.alimentos.forEach( (cantidad, alimento, map) => {
        console.log(alimento + " " + cantidad) // pepino: 500 etc
      });


    }


    incrementBtn_group_width(){
      this._btn_group_width += 1
    }

    
    incrementBtn(){
      this._btn += 1
    }


    get btn_group_width() {
      if(this._btn_group_width != 'null'){
        return  this._btn_group_width;
      }else{
        return "";
      }
  
   }

   get btn() {
    if(this._btn != 'null'){
      return  this._btn;
    }else{
      return "";
    }

 }



    get tipo() {
      if(this._tipo != 'null'){
        return  this._tipo;
      }else{
        return "";
      }
  
   }
    // Getter
    get dia() {
        if(this._dia != 'null'){
          return  this._dia;
        }else{
          return "";
        }
     }

     get semana() {
      if(this._semana != 'null'){
        return this._semana;
      }else{
        return "";
      }
    }

    get sql() {
      if(this._sqlCommand != 'null'){
        return this._sqlCommand;
      }else{
        return "";
      }
    }

    set sql(param) {
      this._sqlCommand = param
      console.log(this._sqlCommand)
    }

    mismaComida(tipo, dia){
        var misma = false
        
        if(this._tipo == tipo && this._dia == dia){
            misma = true
        }

        return misma
    }



    prepareSql(nombre){
      this.alimentos.forEach( (cantidad, alimento, map) => {
        let array = alimento.split("-")
        this._sqlCommand += "INSERT INTO alimentos_comidas (tipo, alimento, cantidad, consumido, modificar, comida) "
        this._sqlCommand += "VALUES (\"" + this._tipo + "\", \"" + array[0] + "\", \"" + cantidad + "\", "
        this._sqlCommand +=  " 0, 0, "
        this._sqlCommand += "(SELECT idcomidas_dia FROM comidas_dia WHERE comidas_dia.dieta = \"" + nombre + "\" AND "
        this._sqlCommand += "comidas_dia.dia = '" + this._dia + "')); \n"
      });
    }


    prepareSqlModelo(nombre){
      this.alimentos.forEach( (cantidad, alimento, map) => {
        let array = alimento.split("-")
        this._sqlCommand += "INSERT INTO alimentos_comida_modelo (tipo, alimentos, cantidad, comidas_modelo) "
        this._sqlCommand += "VALUES (\"" + this._tipo + "\", \"" + array[0] + "\", \"" + cantidad + "\", (SELECT idcomidas_dia_modelo " 
        this._sqlCommand += "FROM comidas_dia_modelo WHERE comidas_dia_modelo.dieta_modelo = \"" + nombre + "\" AND comidas_dia_modelo.dia = " + this._dia + ")); \n"
      });
    }



  }

  