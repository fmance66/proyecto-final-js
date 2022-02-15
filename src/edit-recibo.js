/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from './utiles.js';

// carga file JSON de datos 
// import jsonLiquidaciones from '../data/liquidaciones.json' assert { type: "json" };
// import jsonEmpleados from '../data/empleados.json' assert { type: "json" };

// let arrayLiquidaciones = jsonLiquidaciones.liquidaciones;
// let arrayEmpleados = jsonEmpleados.empleados;

// carga los datos del recibo desde sessionStorage
const cargarDatosRecibo = () => {

  // obtiene los datos del recibo desde el sessionStorage
  let recibo = JSON.parse(sessionStorage.getItem("objRecibo"));

  // console.log(recibo);

  // busca la liquidacion segun el idLiquidacion
  // let liquidacion = utiles.getLiquidacion(arrayLiquidaciones, recibo.idLiquidacion);
  let liquidacion = utiles.getLiquidacion(recibo.idLiquidacion);
  // console.log(liquidacion);

  // busca el empleado segun el legajo
  // let empleado = utiles.getEmpleado(arrayEmpleados, recibo.legajo);
  let empleado = utiles.getEmpleado(recibo.legajo);
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
