/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/
  
function Empleado(legajo, nombre, cuil, estado, fechaIngreso, idCategoria, obraSocial, 
                  telefono, eMail, domicilio) {
  this.legajo = legajo;
  this.nombre = nombre;
  this.cuil = cuil;
  this.estado = estado;
  this.fechaIngreso = fechaIngreso;
  this.idCategoria = idCategoria;
  this.obraSocial = obraSocial;
  this.telefono = telefono;
  this.eMail = eMail;
  this.domicilio = domicilio;
  this.mostrar = function() {
      `{ legajo: ${this.legajo}, nombre: ${this.nombre}, cuil: ${this.cuil}, estado: ${this.estado}` +
       ` fechaIngreso: ${this.fechaIngreso}, idCategoria: ${this.idCategoria}, obraSocial: ${this.obraSocial}` +
       ` telefono: ${this.telefono}, eMail: ${this.eMail}, domicilio: ${this.domicilio}`
  }

}
   
export { Empleado };
