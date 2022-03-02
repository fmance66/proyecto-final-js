/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from './utiles.js';
// import { Variable } from './variable.js';
import { TipoVariables } from './tipoVariable.js';

class Variable {

  constructor (variable) {
    this.id = variable.id;
    this.nombre = variable.nombre;
    this.valor  = variable.valor;
    this.idTipoVariable = variable.idTipoVariable;
    this.estado = variable.estado;
  }

  mostrar() {
      return (
      `{ id: ${this.id}, nombre: ${this.nombre}, valor: ${this.valor},` +
      ` idTipoVariable: ${this.idTipoVariable}, estado: ${this.estado} }`
      )
  }

}  // fin de class Variable

  
// carga los datos de la variable desde sessionStorage
const cargarDatosVariable = () => {

  // obtiene los datos de la variable desde el sessionStorage
  const variable = new Variable(
    JSON.parse(sessionStorage.getItem("objVariable"))
  );

  // console.log(variable);

  // busca el tipo de variable segun el idTipoVariable
  const tipoVariables = new TipoVariables();
  let tipoVariable = tipoVariables.get(variable.idTipoVariable);
  // console.log(tipoVariable);

  // carga el select de tipo de variable desde el json
  let tipoVariableSelect = document.querySelector('#selTipoVariable');
  tipoVariables.getAll().forEach(function(tipoVariable) {
    let opcion = document.createElement('option');
    opcion.value = tipoVariable.id;
    opcion.text = tipoVariable.descripcion;
    tipoVariableSelect.add(opcion);
  });
  
  // asigna valores desde el objeto variable
  document.querySelector("#nombre").value = variable.nombre;
  document.querySelector("#valor").value = variable.valor;
  document.querySelector("#selTipoVariable").value = tipoVariable.id;
}

// datepicker para fechas (jquery)
$(function() {
  $("#fecha").datepicker({
    defaultDate: "01/02/2022"
  });
});

// carga los datos del recibo desde la sessionStorage
window.onload=cargarDatosVariable();
