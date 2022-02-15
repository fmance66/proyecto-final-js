/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from './utiles.js';

// carga file JSON de datos 
import jsonLiquidaciones from '../data/liquidaciones.json' assert { type: "json" };
  
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

let arrayLiquidaciones = jsonLiquidaciones.liquidaciones;

const lsLiquidaciones = "lsLiquidaciones";

// carga tabla de liquidaciones desde array de liquidaciones
const cargarTablaLiquidaciones = () => {

  // guarda el array de objetos 'Liquidacion' obtenido desde el JSON externo en localStorage
  localStorage.setItem(lsLiquidaciones, JSON.stringify(arrayLiquidaciones));

  let tablaLiquidaciones = document.querySelector("#tablaLiquidaciones");
  let tbody = document.createElement("tbody");
  // tbody.style.cursor = "pointer";
  tablaLiquidaciones.appendChild(tbody);

  // console.log(arrayLiquidaciones);

  for (let ii = 0; ii < arrayLiquidaciones.length; ii++) {
      let tr = document.createElement("tr");

      // columna de checkbox
      let td = document.createElement("td");
      td.innerHTML = '<input type="checkbox" />';
      td.classList.add("tm-col-checkbox");
      tr.appendChild(td);

      let liquidacion = arrayLiquidaciones[ii];
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
                // td.classList.add("tm-col-estado");
              }

              if (liquidacion.estado == "abierta") {
                // agrega clase al campo para uso futuro y convierte cursor tipo manito
                td.classList.add("tm-col-liquidacion");
                td.style.cursor = "pointer";
              }

              // agrega la columna a la fila con una clase con el nombre del atributo de clase
              td.classList.add(`tm-col-${e}`);
              tr.appendChild(td);
          }
      }

      // columna con icono de eliminar
      td = document.createElement("td");
      td.innerHTML = '<a href="#" class="tm-liquidacion-delete-link">' +
                        '<i class="far fa-trash-alt tm-liquidacion-delete-icon" />' +
                     '</a>';
      td.classList.add("tm-col-delete");
      tr.appendChild(td);

      // agrega clase a la fila para usar en el click
      tr.classList.add("tm-fila-liquidacion");
      tbody.appendChild(tr);
  }

}

// carga tabla de liquidacion
window.onload=cargarTablaLiquidaciones();

// eventos de fila de tabla
$(function() {

  // reenvia a la pagina edit-liquidacion.html (jquery)
  $(".tm-fila-liquidacion").on("click", function() {
      let tabla = document.getElementById("tablaLiquidaciones");  
      let fila = $(this).closest('tr')[0];   // guarda la fila seleccionada
      // console.log(fila);

      let tds = fila.querySelectorAll("td");

      // // recorre los td de la fila
      // for (let ii = 0; ii < tds.length, ii++) {
      //   console.log(`ii: ${ii} tds: ${tds[ii]}`);
      // }

      const liquidacion = new Liquidacion(); 
      liquidacion.id = fila.querySelector(".tm-col-id").innerText;
      liquidacion.periodo = fila.querySelector(".tm-col-periodo").innerText;
      liquidacion.descripcion = fila.querySelector(".tm-col-descripcion").innerText;
      liquidacion.estado = fila.querySelector(".tm-col-estado").innerText;
      liquidacion.fechaPago = fila.querySelector(".tm-col-fechaPago").innerText;

      // console.log(`liquidacion: ${liquidacion.mostrar()}`);
      
      if (liquidacion.estado == "Abierta") {
        // console.log(`objLiquidacion: ${JSON.stringify(liquidacion)}`);
        sessionStorage.setItem("objLiquidacion", JSON.stringify(liquidacion));
        // console.log('window.location.href = "edit-liquidacion.html"');
        window.location.href = "edit-liquidacion.html";
      }

  });

  // anula el evento click para el checkbox
  $(".tm-fila-liquidacion").on("click", ".tm-col-checkbox", function(e) { 
    // console.log('se hizo click en "tm-col-checkbox"');
    e.stopPropagation() 
  });

  // anula el evento click para el boton delete
  $(".tm-fila-liquidacion").on("click", ".tm-col-delete", function(e) { 
    // console.log('se hizo click en "tm-col-delete"');
    e.stopPropagation() 
  });

  // cambia el color de fila editable
  $(".tm-fila-liquidacion").on("mouseover", function() { 
    // console.log('se hizo click en "onmouseover"');
    let estado = this.querySelector(".tm-col-estado").innerText;
    if (estado == 'Abierta') {
      // ChangeBackgroundColor(this);
      $(this).css({
        'background-color': '#6987a5'
      });
    }
  });

  // restaura el color de fila editable
  $(".tm-fila-liquidacion").on("mouseout", function() { 
    // console.log('se hizo click en "onmouseover"');
    // RestoreBackgroundColor(this);
    $(this).css({
      'background-color': '#4f667c'
    });
  });

});

export { Liquidacion, lsLiquidaciones };
