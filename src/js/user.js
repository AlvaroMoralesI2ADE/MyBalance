
module.exports = class Usuario {

    constructor (email,nombre,altura,peso, tipo, alergiasIntolerancia) {
      this.email = email;
      this.nombre = nombre;
      this.altura = altura;
      this.peso = peso;
      this.tipo = tipo;
      this.alergiasIntolerancia = alergiasIntolerancia;
    }
    // Getter
    get email() {
       return  this.email;
     }

     get altura() {
      return this.altura;
    }

    
    get peso() {
      return  this.peso;
    }
    
    get tipo() {
      return this.tipo;
    }

    get alergiasIntolerancia() {
      return  this.alergiasIntolerancia;
    }
 
  }

  