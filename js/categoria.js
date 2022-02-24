/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/
  
function Categoria(id, descripcion, sueldoBruto, estado) {
  this.id = id;
  this.descripcion = descripcion;
  this.sueldoBruto = sueldoBruto;
  this.estado = estado;
  this.mostrar = function() {
      `{ id: ${this.id}, descripcion: ${this.descripcion}, sueldoBruto: ${this.sueldoBruto}, estado: ${this.estado}  }`
  }
}
   
export { Categoria };
