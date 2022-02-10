/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from './utiles.js';

// carga file JSON de datos 
import arrayLiquidaciones from '../data/liquidaciones.json' assert { type: "json" };

const lsLiquidaciones = "lsLiquidaciones";
  
function Liquidacion(id, periodo, descripcion, estado, fechaPago) {
  this.id = id;
  this.periodo = periodo;
  this.descripcion = descripcion;
  this.estado = estado;
  this.fechaPago  = fechaPago;
  this.mostrar = function() {
    return (
      `{ id: ${this.id}, periodo: ${this.periodo}, descripcion: ${this.descripcion},` + 
      ` estado: ${this.estado}, fechaPago: ${this.fechaPago} }`
      )
  }
}

// carga tabla de liquidaciones desde array de liquidaciones
const cargarTablaLiquidaciones = () => {

  // guarda el array de objetos 'Liquidacion' obtenido desde el JSON externo en localStorage
  localStorage.setItem(lsLiquidaciones, JSON.stringify(arrayLiquidaciones.liquidaciones));

  let tablaLiquidaciones = document.querySelector("#tablaLiquidaciones");
  let tbody = document.createElement("tbody");
  // tbody.style.cursor = "pointer";
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

              if (e == 'id' || e == 'descripcion' || e == 'periodo') {
                td.classList.add("tm-liquidacion-bold");
              };
                
              // semaforo de estado
              if (e == 'estado') {       
                td.innerHTML = utiles.generateDivEstado(liquidacion[e]);
              }

              // agrega clase al campo y convierte cursor para usar con el "click"
              td.classList.add("tm-col-liquidacion");
              td.style.cursor = "pointer";

              tr.appendChild(td);
          }
      }

      // columna con icono de eliminar
      td = document.createElement("td");
      td.innerHTML = '<a href="#" class="tm-liquidacion-delete-link">' +
                      '<i class="far fa-trash-alt tm-liquidacion-delete-icon" />' +
                  '</a>';
      tr.appendChild(td);

      // agrega clase a la fila para usar en un futuro?
      tr.classList.add("tm-fila-liquidacion");

      tbody.appendChild(tr);
  }

}

// carga tabla de liquidacion
window.onload=cargarTablaLiquidaciones();

function onRowClick(idTabla, callback) {
  let tabla = document.getElementById(idTabla);
  let cantFilas = tabla.getElementsByTagName("tr").length;
  for (let ii = 0; ii < cantFilas; ii++) {
      // configura click en cada fila
      tabla.rows[ii].onclick = function (fila) {
          return function () {
              callback(fila);
          };
      } (tabla.rows[ii]);
  }
};

onRowClick("tablaLiquidaciones", function (fila) {

  let tds = fila.querySelectorAll("td");
  let estado = tds[4].innerText;

  // // recorre el tr sacando el 1er y ultimo elemento (checkbox y boton eliminar)
  // for (let ii = 1; ii < tds.length - 1; ii++) {
  //   console.log(`ii: ${ii} tds: ${tds[ii].innerText}`);
  // }

  const liquidacion = new Liquidacion(); 
  liquidacion.id = tds[1].innerText;
  liquidacion.periodo = tds[2].innerText; 
  liquidacion.descripcion = tds[3].innerText; 
  liquidacion.estado = tds[4].innerText;
  liquidacion.fechaPago = tds[5].innerText; 
    
  // console.log(`liquidacion: ${liquidacion.mostrar()}`);
  
  if (estado == "Abierta") {
    // console.log(`objLiquidacion: ${JSON.stringify(liquidacion)}`);
    sessionStorage.setItem("objLiquidacion", JSON.stringify(liquidacion));
    // console.log('window.location.href = "edit-liquidacion.html"');
    // setTimeout( function() { window.location.href = "edit-liquidacion.html"; }, 5000 );
    window.location.href = "edit-liquidacion.html";
  }

});

// // reenvia a la pagina edit-liquidacion.html (javascript vanilla)
// const col = document.querySelector(".tm-col-liquidacion");
// col.addEventListener("click", () => {
//   window.location.href = "edit-liquidacion.html";
// });

// // reenvia a la pagina edit-liquidacion.html (jquery)
// $(function() {
//     $(".tm-col-liquidacion").on("click", function() {
//       window.location.href = "edit-liquidacion.html";
//     });
//   });


export { Liquidacion, lsLiquidaciones };
