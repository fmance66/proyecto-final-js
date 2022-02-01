/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from './utiles.js';

// carga file JSON de datos 
import arrayLiquidaciones from '../data/liquidaciones.json' assert { type: "json" };

const lsLiquidaciones = "lsLiquidaciones";
  
const Liquidacion = (id, periodo, descripcion, estado, fechaPago) => {
  this.id = id;
  this.periodo = periodo;
  this.descripcion = descripcion;
  this.estado = estado;
  this.fechaPago  = fechaPago;
  this.mostrar = function() {
      `{ id: ${this.id}, periodo: ${this.periodo}, descripcion: ${this.descripcion}, estado: ${this.estado},` + 
      ` fechaPago: ${this.fechaPago} }`
  }
}

// carga tabla de liquidaciones desde array de liquidaciones
const cargarTablaLiquidaciones = () => {

  // guarda el array de objetos 'Liquidacion' obtenido desde el JSON externo en localStorage
  utiles.SetEnLocalStorage(lsLiquidaciones, JSON.stringify(arrayLiquidaciones.liquidaciones));

  let tablaLiquidaciones = document.querySelector("#tablaLiquidaciones");
  let tbody = document.createElement("tbody");
  tablaLiquidaciones.appendChild(tbody);

  // console.log(arrayLiquidaciones.liquidaciones);

  for (let ii = 0; ii < arrayLiquidaciones.liquidaciones.length; ii++) {
      let tr = document.createElement("tr");

      // columna de checkbox
      let td = document.createElement("td");
      td.innerHTML = '<input type="checkbox" />';
      tr.appendChild(td);

      let liquidacion = arrayLiquidaciones.liquidaciones[ii];
      for (let e in liquidacion) {

          if (liquidacion.hasOwnProperty(e)) {
              let td = document.createElement("td");
              if (e == 'id') {
                  td.innerHTML = `#${liquidacion[e]}`
              } else {
                  td.innerHTML = liquidacion[e]
              }

              if (e == 'descripcion' || e == 'periodo') {
                td.classList.add("tm-liquidacion-bold", "tm-nombre-liquidacion");
              } else {
                td.classList.add("tm-nombre-liquidacion");
              };

              tr.appendChild(td);
          }
      }

      // columna con icono de eliminar
      td = document.createElement("td");
      td.innerHTML = '<a href="#" class="tm-liquidacion-delete-link">' +
                      '<i class="far fa-trash-alt tm-liquidacion-delete-icon" />' +
                  '</a>';
      tr.appendChild(td);

      tbody.appendChild(tr);
  }

}

// carga tabla de liquidacion
window.onload=cargarTablaLiquidaciones();

// reenvia a la pagina edit-liquidacion.html
$(function() {
    $(".tm-nombre-liquidacion").on("click", function() {
      window.location.href = "edit-liquidacion.html";
    });
  });

// reenvia a la pagina edit-liquidacion.html
// const botonClick = document.querySelector(".tm-nombre-liquidacion");
// console.log('hizo click');
// botonClick.addEventListener("click", () => {
//     window.location.href = "edit-liquidacion.html";
// });


export { Liquidacion, lsLiquidaciones };
