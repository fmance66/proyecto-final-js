/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/
  
class Concepto {

  constructor(concepto) {
    this.id = concepto.id;
    this.nombre = concepto.nombre;
    this.formula = concepto.formula;
    this.mostrado = concepto.mostrado;
    this.estado = concepto.estado;
  }

  mostrar = () => {
      `{ id: ${this.id}, descripcion: ${this.nombre}, variable: ${this.formula},` +
      ` mostrado: ${this.mostrado}, estado: ${this.estado}  }`
  }
}
   
export { Concepto };
