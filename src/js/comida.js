
module.exports = class Comida {

   

    constructor (tipo, dia, alimento, cantidad, btn_group_width, btn) {
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
      this.alimentos.delete(alim)
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
      
        
        if(this._tipo == tipo && this._dia == dia){
            misma = true
        }

        return misma
    }



  }

  