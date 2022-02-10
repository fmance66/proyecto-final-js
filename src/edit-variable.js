/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from './utiles.js';

// carga file JSON de datos 
import arrayVariables from '../data/variables.json' assert { type: "json" };
import arrayTipoVariables from '../data/tipoVariables.json' assert { type: "json" };
  
const cargarSelectTipoVariable = () => {

  let tipoVariableSelect = document.querySelector('#tipoVariable');
  
  // tipoVariableSelect.addEventListener("change", xxxxxxxxx);

  arrayTipoVariables.tipoVariables.forEach(function(tipoVariable) {
      let opcion = document.createElement('option')
      opcion.value = tipoVariable.id
      opcion.text = tipoVariable.descripcion
      tipoVariableSelect.add(opcion)
  })
}

// carga los datos de la variable desde sessionStorage
const cargarDatosVariable = () => {

  // obtiene los datos de la variable desde el sessionStorage
  let variable = JSON.parse(sessionStorage.getItem("objVariable"));

  // console.log(variable);

  // busca el tipo de variable segun el idTipoVariable
  let tipoVariable = utiles.getTipoVariable(arrayTipoVariables.tipoVariables, variable.idTipoVariable);
  // console.log(tipoVariable);

  // carga el select de tipo de variable desde el json
  cargarSelectTipoVariable();

  // asigna valores desde el objeto variable
  document.querySelector("#nombre").value = variable.nombre;
  document.querySelector("#valor").value = variable.valor;
  document.querySelector("#tipoVariable").value = tipoVariable.id;
}

// datepicker para fechas (jquery)
$(function() {
  $("#fecha").datepicker({
    defaultDate: "01/02/2022"
  });
});


// carga los datos del recibo desde la sessionStorage
window.onload=cargarDatosVariable();


// export { xxxxx, yyyyy };
