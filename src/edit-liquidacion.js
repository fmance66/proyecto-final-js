/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

// import * as utiles from './utiles.js';


// carga los datos de la liquidacion desde sessionStorage
const cargarDatosLiquidacion = () => {

  // obtiene los datos de la liquidacion desde el sessionStorage
  let liquidacion = JSON.parse(sessionStorage.getItem("objLiquidacion"));

  console.log(liquidacion);

  // asigna valores desde el objeto liquidacion
  document.querySelector("#periodo").value = liquidacion.periodo;
  document.querySelector("#descripcion").value = liquidacion.descripcion;
  document.querySelector("#fechaPago").value = liquidacion.fechaPago;

}


// datepicker para fechas (jquery)
$(function() {
  $("#fechaPago").datepicker({
    defaultDate: "01/02/2022"
  });
});


// carga los datos de la liquidación desde la sessionStorage
window.onload=cargarDatosLiquidacion();


// export { xxxxx, yyyyy };
