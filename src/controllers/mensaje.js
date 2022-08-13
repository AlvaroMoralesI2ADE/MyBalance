module.exports =  class mensaje{
  constructor (mensaje, fecha,  enviado) {
    this._mensaje = mensaje
    this._fecha = fecha
    this._enviado = enviado  
  }


  get fecha() {
    if(this._fecha != 'null'){
      return  this._fecha;
    }else{
      return "";
    }
  }


  get mensaje() {
    if(this._mensaje != 'null'){
      return  this._mensaje;
    }else{
      return "";
    }
  }

  get enviado() {
    if(this._enviado != 'null'){
      return  this._enviado;
    }else{
      return "";
    }
  }

}

  