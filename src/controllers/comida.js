const { select } = require("async")


class ComidaCantidad{
  constructor (alimento, cantidad, bd, eliminar) {
    this._alimento = alimento
    this._cantidad = cantidad
    this._bd = bd
    this._eliminar = eliminar
  
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

  set eliminar(elim) {
    this._eliminar = elim
  }


  
  get eliminar() {
    if(this._eliminar != 'null'){
      return  this._eliminar;
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
      let alimentoCantidad = new ComidaCantidad(alimento,cantidad, bd, false)
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
      let yaEnBd = false
      console.log(this._alimentos)
      this._alimentos.forEach(function(alim, index, object) {
        if(alim.alimento == alimento && alim.eliminar == true){
          object.splice(index, 1)
          yaEnBd = true
        }else if(alim.alimento == alimento && alim.eliminar == false){
          añadido = false
        }
      });


      if(añadido){
        if(yaEnBd){
          this._alimentos.push(new ComidaCantidad(alimento,cantidad, true, false))
        }else{
          this._alimentos.push(new ComidaCantidad(alimento,cantidad, bd, false))
        }
      }

      return añadido
      
    }


    get alimentos() {
      return this._alimentos;
    }


    eliminarAlimento(alim){ 
      console.log("entra")
      this._alimentos.forEach(function(alimentos, index, object) {
        if (alimentos.alimento == alim) {
          if(alimentos.eliminar == true){
            object.splice(index, 1)
          }else{
            if(alimentos.bd != false){
              alimentos.eliminar = true
            }else{
              object.splice(index, 1)
            }
          }
        }
      });
    }

    contieneAlimentos(){
      let contiene = false
      if(this._alimentos.length > 0){
        contiene = true
      }

      return contiene
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

    mismaComida(tipo, dia){
        var misma = false
        //console.log(this._tipo + " " + tipo + " " + this._dia + " " + dia)
        if(this._tipo == tipo && this._dia == dia){
            misma = true
        }
        return misma
    }


  }

  