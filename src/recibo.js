/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from '../src/utiles.js';

// carga file JSON de datos 
import arrayRecibos from '../data/recibos.json' assert { type: "json" };

const lsRecibos = "lsRecibos";
  
const Recibo = (id, legajo, nombre, periodo, bruto, descuento, neto) => {
  this.id = id;
  this.legajo = legajo;
  this.nombre = nombre;
  this.periodo = periodo;
  this.bruto  = bruto;
  this.descuento  = descuento;
  this.neto  = neto;
  this.mostrar = function() {
      `{ id: ${this.id}, legajo: ${this.legajo}, periodo: ${this.periodo}, nombre: ${this.nombre},` + 
      ` bruto: ${this.bruto}, descuento: ${this.descuento}, neto: ${this.neto} }`
  }
}

// carga tabla de recibos desde array de recibos
const cargarTablaRecibos = () => {

  // guarda el array de objetos 'Recibo' obtenido desde el JSON externo en localStorage
  utiles.SetEnLocalStorage(lsRecibos, JSON.stringify(arrayRecibos.recibos));

  let tablaRecibos = document.querySelector("#tablaRecibos");
  let tbody = document.createElement("tbody");
  tablaRecibos.appendChild(tbody);

  // console.log(arrayRecibos.recibos);

  for (let ii = 0; ii < arrayRecibos.recibos.length; ii++) {
      let tr = document.createElement("tr");

      // columna de checkbox
      let td = document.createElement("td");
      td.innerHTML = '<input type="checkbox" />';
      tr.appendChild(td);

      let recibo = arrayRecibos.recibos[ii];
      for (let e in recibo) {

          if (recibo.hasOwnProperty(e)) {
              if ((e == 'id') || (e == 'idLiquidacion')) {     // los id no los carga en la tabla
                  continue;
              }
              let td = document.createElement("td");
              if (e == 'legajo') {
                  td.innerHTML = `#${recibo[e]}`
              } else {
                  td.innerHTML = recibo[e]
              }
              if (e == 'legajo' || e == 'nombre' || e == 'periodo') {
                td.classList.add("tm-recibo-bold", "tm-nombre-recibo");
              } else {
                td.classList.add("tm-nombre-recibo");
              }
              tr.appendChild(td);
          }
      }

      // agrega la columna de estado
      td = document.createElement("td");
      td.innerHTML = utiles.GenerateDivEstado(recibo['neto']);
      tr.appendChild(td);

      // columna con icono de eliminar
      td = document.createElement("td");
      td.innerHTML = '<a href="#" class="tm-recibo-delete-link">' +
                      '<i class="far fa-trash-alt tm-recibo-delete-icon" />' +
                  '</a>';
      tr.appendChild(td);

      tbody.appendChild(tr);
  }

}

// carga tabla de recibos
window.onload=cargarTablaRecibos();

// reenvia a la pagina edit-recibo.html
// $(function() {
//     $(".tm-nombre-recibo").on("click", function() {
//       window.location.href = "edit-recibo.html";
//     });
//   });

// reenvia a la pagina edit-recibo.html
const botonClick = document.querySelector(".tm-nombre-recibo");
console.log('hizo click');
botonClick.addEventListener("click", () => {
    window.location.href = "edit-recibo.html";
});


// export { Recibo, lsRecibos, cargarTablaRecibos };
export { Recibo, lsRecibos };
