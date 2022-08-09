const { select } = require("async")


class ComidaCantidad{
  constructor (alimento, cantidad, bd) {
    this._alimento = alimento
    this._cantidad = cantidad
    this._bd = bd
  
  }

  get alimento() {
    if(this._alimento != 'null'){
      return  this._alimento;
    }else{
      return "";
    }
  }

  get cantidad() {
    if(this._cantidad != 'null'){
      return  this._cantidad;
    }else{
      return "";
    }
  }

  get bd() {
    if(this._bd != 'null'){
      return  this._bd;
    }else{
      return "";
    }
  }
}



module.exports = class Comida {

   

    constructor (tipo, dia, alimento, cantidad, bd, btn_group_width, btn) {
      //this._sqlCommand = ""
      this._semana = 0
      this._btn_group_width = 0
      this._btn  = 0
      let alimentoCantidad = new ComidaCantidad(alimento,cantidad, bd)
      this._alimentos = []
      this._alimentos.push(alimentoCantidad)

      this._tipo = tipo;
      this._dia = dia;
      //this.alimentos.set(alimento,cantidad);
      this._btn_group_width = btn_group_width
      this._btn = btn
      
    }

    añadirAlimento(alimento, cantidad, bd){
      let añadido = true

      console.log(this._alimentos)

      this._alimentos.forEach(alim => {
        console.log(alim.alimento)
      });

      this._alimentos.forEach(alim => {
        if(alim.alimento  == alimento){
          añadido = false
        }
      });

      if(añadido){
        this._alimentos.push(new ComidaCantidad(alimento,cantidad, bd))
      }

      return añadido
      
    }

    eliminarAlimento(alim){   
      this._alimentos.forEach(function(alimentos, index, object) {
        console.log(alimentos.alimento + " " + alim)
        if (alimentos.alimento == alim) {
          object.splice(index, 1)
          console.log("entra")
        }
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
/*
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
    }*/

    mismaComida(tipo, dia){
        var misma = false
        //console.log(this._tipo + " " + tipo + " " + this._dia + " " + dia)
        if(this._tipo == tipo && this._dia == dia){
            misma = true
        }

        return misma
    }

/*

    prepareSql(nombre){

      this._alimentos.forEach(alim => {
        if(alim.bd != true){
          let array = alimento.split("-")
          this._sqlCommand += "INSERT INTO alimentos_comidas (tipo, alimento, cantidad, consumido, modificar, comida) "
          this._sqlCommand += "VALUES (\"" + this._tipo + "\", \"" + array[0] + "\", \"" + alim.cantidad + "\", "
          this._sqlCommand +=  " 0, 0, "
          this._sqlCommand += "(SELECT idcomidas_dia FROM comidas_del_dia WHERE comidas_del_dia.dieta = \"" + nombre + "\" AND "
          this._sqlCommand += "comidas_del_dia.dia = '" + this._dia + "')); \n"
        }
      });


      /*
      this.alimentos.forEach( (cantidad, alimento, map) => {
        let array = alimento.split("-")
        this._sqlCommand += "INSERT INTO alimentos_comidas (tipo, alimento, cantidad, consumido, modificar, comida) "
        this._sqlCommand += "VALUES (\"" + this._tipo + "\", \"" + array[0] + "\", \"" + cantidad + "\", "
        this._sqlCommand +=  " 0, 0, "
        this._sqlCommand += "(SELECT idcomidas_dia FROM comidas_del_dia WHERE comidas_del_dia.dieta = \"" + nombre + "\" AND "
        this._sqlCommand += "comidas_del_dia.dia = '" + this._dia + "')); \n"
      });
    }


    prepareSqlModelo(nombre){

      this._alimentos.forEach(alim => {
        if(alim.bd != true){
          let array = alim.alimento.split("-")
          this._sqlCommand += "INSERT INTO alimentos_comida_modelo (tipo, alimentos, cantidad, comidas_modelo) "
          this._sqlCommand += "VALUES (\"" + this._tipo + "\", \"" + array[0] + "\", \"" + alim.cantidad + "\", (SELECT idcomidas_dia_modelo " 
          this._sqlCommand += "FROM comidas_del_dia_modelo WHERE comidas_del_dia_modelo.dieta_modelo = \"" + nombre + "\" AND comidas_del_dia_modelo.dia = " + this._dia + ")); \n"
           }
      });
  

    }
*/


  }

  