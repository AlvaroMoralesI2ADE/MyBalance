
class Usuario {

    constructor (email,nombre,edad,altura,peso, tipo, sexo, alergiasIntolerancia) {
      this._email = email;
      this._nombre = nombre;
      this._edad = edad;
      this._altura = altura;
      this._peso = peso;
      this._tipo = tipo;
      this._sexo = sexo;
      this._alergiasIntolerancia = alergiasIntolerancia;
    }


    get sexo() {
      if(this._sexo != 'null'){
        return  this._sexo;
      }else{
        return "";
      }
  
   }
    // Getter
    get email() {
        if(this._email != 'null'){
          return  this._email;
        }else{
          return "";
        }
    
     }

     get altura() {
      if(this._altura != 'null'){
        return this._altura;
      }else{
        return "";
      }
    }


    get edad() {
      if(this._edad != 'null'){
        return  this._edad;
      }else{
        return "";
      }
 
    }

    
    get nombre() {
      if(this._nombre != 'null'){
        return  this._nombre;
      }else{
        return "";
      }
    }


    
    get peso() {
      if(this._peso != 'null'){
        return this._peso;
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

    get alergiasIntolerancia() {
      if(this._alergiasIntolerancia != 'null'){
        return  this._alergiasIntolerancia;
      }else{
        return "";
      }

    }
  }

  