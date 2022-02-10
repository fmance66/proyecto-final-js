/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from '../src/utiles.js';

// carga file JSON de datos 
import arrayRecibos from '../data/recibos.json' assert { type: "json" };
import arrayLiquidaciones from '../data/liquidaciones.json' assert { type: "json" };
import arrayEmpleados from '../data/empleados.json' assert { type: "json" };

const lsRecibos = "lsRecibos";
  
function Recibo (id, legajo, idLiquidacion, estado, bruto, descuento, neto) {
  this.id = id;
  this.legajo = legajo;
  this.idLiquidacion = idLiquidacion;
  this.estado  = estado;
  this.bruto  = bruto;
  this.descuento  = descuento;
  this.neto  = neto;
  this.mostrar = function() {
      return (
      `{ id: ${this.id}, legajo: ${this.legajo}, idLiquidacion: ${this.idLiquidacion},` + 
      ` estado: ${this.estado}, bruto: ${this.bruto}, descuento: ${this.descuento}, neto: ${this.neto} }`
      )
  }
}

// carga tabla de recibos desde array de recibos
const cargarTablaRecibos = () => {

  // guarda el array de objetos 'Recibo' obtenido desde el JSON externo en localStorage
  localStorage.setItem(lsRecibos, JSON.stringify(arrayRecibos.recibos));

  let tablaRecibos = document.querySelector("#tablaRecibos");
  let tbody = document.createElement("tbody");
  tablaRecibos.appendChild(tbody);

//   console.log(arrayRecibos.recibos);
//   console.log(arrayLiquidaciones.liquidaciones);
//   console.log(arrayEmpleados.empleados);

  for (let ii = 0; ii < arrayRecibos.recibos.length; ii++) {
      let tr = document.createElement("tr");

      // columna de checkbox
      let td = document.createElement("td");
      td.innerHTML = '<input type="checkbox" />';
      tr.appendChild(td);

      let recibo = arrayRecibos.recibos[ii];

      // busca la liquidacion segun el idLiquidacion
      let liquidacion = utiles.getLiquidacion(arrayLiquidaciones.liquidaciones, recibo.idLiquidacion);

      // busca el empleado segun el legajo
      let empleado = utiles.getEmpleado(arrayEmpleados.empleados, recibo.legajo);

      for (let e in recibo) {

          if (recibo.hasOwnProperty(e)) {
              
            let td = document.createElement("td");
              
            if (e == 'id') {     // los id no los muestra, estan ocultos
                td.classList.add("oculto");
            }
              
            if (e == 'legajo') {
                // carga legajo
                td.innerHTML = `#${recibo[e]}`
                td.classList.add("tm-recibo-bold", "tm-col-recibo");
                td.style.cursor = "pointer";
                tr.appendChild(td);
                // y carga nombre
                td = document.createElement("td");
                td.classList.add("tm-recibo-bold");
                td.innerHTML = empleado.nombre; 
            } else {
                td.innerHTML = recibo[e]
            }
              
            // oculta el id y muestra el periodo de la liquidacion
            if (e == 'idLiquidacion') {     
                // carga idLiquidacion oculto
                td.innerHTML = recibo.idLiquidacion;
                td.classList.add("oculto");
                tr.appendChild(td);
                // carga el periodo del idLiquidacion
                td = document.createElement("td");
                td.innerHTML = liquidacion.periodo;
            }
                  
            // semaforo de estado y periodo de liquidacion
            if (e == 'estado') {
                td.innerHTML = utiles.generateDivEstado(recibo[e]);
            }

            // agrega clase al campo y convierte cursor para usar con el "click"
            td.classList.add("tm-col-recibo");
            td.style.cursor = "pointer";

            tr.appendChild(td);

          }
      }

    //   // agrega la columna de estado
    //   td = document.createElement("td");
    //   td.innerHTML = utiles.generateDivEstado(recibo['neto']);
    //   tr.appendChild(td);

      // columna con icono de eliminar
      td = document.createElement("td");
      td.innerHTML = '<a href="#" class="tm-recibo-delete-link">' +
                      '<i class="far fa-trash-alt tm-recibo-delete-icon" />' +
                  '</a>';
      tr.appendChild(td);

      // agrega clase a la fila para usar con el "click"
      tr.classList.add("tm-fila-recibo");

      tbody.appendChild(tr);
  }

}

// carga tabla de recibos
window.onload=cargarTablaRecibos();

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

onRowClick("tablaRecibos", function (fila) {

  let tds = fila.querySelectorAll("td");
  let estado = tds[6].innerText;

  // recorre el tr sacando el 1er y ultimo elemento (checkbox y boton eliminar)
  for (let ii = 1; ii < tds.length - 1; ii++) {
    console.log(`ii: ${ii} tds: ${tds[ii].innerText}`);
  }

  const recibo = new Recibo(); 
  recibo.id = tds[1].innerText;                    // oculto
  recibo.legajo = tds[2].innerText.replace('#', ''); 
//   recibo.nombre = tds[3].innerText; 
  recibo.idLiquidacion = tds[4].innerText;         // oculto
//   recibo.periodo = tds[5].innerText; 
  recibo.estado = tds[6].innerText;
  recibo.bruto = tds[7].innerText; 
  recibo.descuento = tds[8].innerText; 
  recibo.neto = tds[9].innerText; 
    
//   console.log(`recibo: ${recibo.mostrar()}`);
  
  if (estado == "Activo") {
    // console.log(`objRecibo: ${JSON.stringify(recibo)}`);
    sessionStorage.setItem("objRecibo", JSON.stringify(recibo));
    // console.log('window.location.href = "edit-recibo.html"');
    window.location.href = "edit-recibo.html";
  }

});


// // reenvia a la pagina edit-recibo.html (javascript vanilla)
// const botonClick = document.querySelector(".tm-fila-recibo");
// botonClick.addEventListener("click", () => {
//     window.location.href = "edit-recibo.html";
// });

// // reenvia a la pagina edit-recibo.html (jquery)
// $(function() {
//     $(".tm-fila-recibo").on("click", function() {
//       window.location.href = "edit-recibo.html";
//     });
//   });

export { Recibo, lsRecibos };
