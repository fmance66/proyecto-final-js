/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from './utiles.js';

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

//***** carga file JSON de datos 

const urlJson = '../data/liquidaciones.json';

// carga json de liquidaciones y carga tabla html
const cargarJsonLiquidaciones = () => {

  let jsonData = localStorage.getItem(lsLiquidaciones);
  // console.log(jsonData);

  // verifica si existe el json de liquidaciones en local storage
  if (jsonData == null || jsonData === undefined) {   // si no existe lo carga del json externo

      console.log('... cargando local storage de .json externo...');

      $.get(urlJson, function(data, estado) {
          if (estado === "success") {
              // console.log(respuesta.liquidaciones);
              // guarda el array de objetos 'Liquidacion' en localStorage
              localStorage.setItem(lsLiquidaciones, JSON.stringify(data.liquidaciones));
              // arma la tabla de liquidaciones
              armarTablaLiquidaciones(data.liquidaciones);
          }
      })
  } else {                                           // si existe lo parsea
      // console.log('cargando de local storage...', JSON.parse(jsonData));
    // arma la tabla de liquidaciones
      armarTablaLiquidaciones(JSON.parse(jsonData));
  };
};

// carga tabla de liquidaciones desde array de liquidaciones
const armarTablaLiquidaciones = (arrayObj) => {

  let tablaLiquidaciones = document.querySelector("#tablaLiquidaciones");
  let tbody = document.createElement("tbody");
  tablaLiquidaciones.appendChild(tbody);

  // console.log(arrayObj);

  for (let ii = 0; ii < arrayObj.length; ii++) {
      let tr = document.createElement("tr");

      // columna de checkbox
      let td = document.createElement("td");
      td.innerHTML = '<input type="checkbox" />';
      td.classList.add("tm-col-checkbox");
      tr.appendChild(td);

      let liquidacion = arrayObj[ii];
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

// carga las liquidaciones desde el .json y arma tabla de liquidaciones
window.onload=cargarJsonLiquidaciones();

// eventos de fila de tabla
$(function() {

  // reenvia a la pagina edit-liquidacion.html (jquery)
  $(".tm-fila-liquidacion").on("click", function() {
      let tabla = document.getElementById("tablaLiquidaciones");  
      let fila = $(this).closest('tr')[0];   // guarda la fila seleccionada
      // console.log(fila);

      let tds = fila.querySelectorAll("td");

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
      $(this).css({
        'background-color': '#6987a5'
      });
    }
  });

  // restaura el color de fila editable
  $(".tm-fila-liquidacion").on("mouseout", function() { 
    // console.log('se hizo click en "onmouseover"');
    $(this).css({
      'background-color': '#4f667c'
    });
  });

});


export { Liquidacion };
