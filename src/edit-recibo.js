/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from './utiles.js';

// carga file JSON de datos 
import arrayLiquidaciones from '../data/liquidaciones.json' assert { type: "json" };
import arrayEmpleados from '../data/empleados.json' assert { type: "json" };

// carga los datos del recibo desde sessionStorage
const cargarDatosRecibo = () => {

  // obtiene los datos del recibo desde el sessionStorage
  let recibo = JSON.parse(sessionStorage.getItem("objRecibo"));

  console.log(recibo);

  // busca la liquidacion segun el idLiquidacion
  let liquidacion = utiles.getLiquidacion(arrayLiquidaciones.liquidaciones, recibo.idLiquidacion);
  // console.log(liquidacion);

  // busca el empleado segun el legajo
  let empleado = utiles.getEmpleado(arrayEmpleados.empleados, recibo.legajo);
  // console.log(empleado);

  // asigna valores desde el objeto recibo
  document.querySelector("#legajo").value = recibo.legajo;
  document.querySelector("#nombre").value = empleado.nombre;

}

// datepicker para fechas (jquery)
$(function() {
  $("#fechaNacimiento").datepicker({
    defaultDate: "01/02/2022"
  });
});


// carga los datos del recibo desde la sessionStorage
window.onload=cargarDatosRecibo();


// export { xxxxx, yyyyy };
