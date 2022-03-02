/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from './utiles.js';
// import { Recibo } from './recibo.js';
import { EmpleadoController } from './controllers/empleadoController.js';
import { LiquidacionController } from './controllers/liquidacionController.js';
  
class Recibo {

  constructor (recibo) {
    this.id = recibo.id;
    this.legajo = recibo.legajo;
    this.idLiquidacion = recibo.idLiquidacion;
    this.estado = recibo.estado;
    this.bruto = recibo.bruto;
    this.descuento = recibo.descuento;
    this.neto = recibo.neto;
  }
};     // fin de class Recibo


// carga los datos del recibo desde sessionStorage
const cargarDatosRecibo = () => {

  // obtiene los datos del recibo desde el sessionStorage
  const recibo = new Recibo(
    JSON.parse(sessionStorage.getItem("objRecibo"))
  );

  // console.log(recibo);

  // busca la liquidacion segun el idLiquidacion
  const liquidaciones = new LiquidacionController();
  let liquidacion = liquidaciones.get(recibo.idLiquidacion);

  // console.log(liquidacion);

  // busca el empleado segun el legajo
  const empleados = new EmpleadoController();
  let empleado = empleados.get(recibo.legajo);
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

