/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/
  
function Concepto(id, descripcion, variable, mostrado, estado) {
  this.id = id;
  this.descripcion = descripcion;
  this.variable = variable;
  this.mostrado = mostrado;
  this.estado = estado;
  this.mostrar = function() {
      `{ id: ${this.id}, descripcion: ${this.descripcion}, variable: ${this.variable},` +
      ` mostrado: ${this.mostrado}, estado: ${this.estado}  }`
  }
}
   
export { Concepto };
