/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from './utiles.js';

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

//***** carga file JSON de datos 

// import jsonRecibos from '../data/recibos.json' assert { type: "json" };

// --- metodo 1) IMPORT
// const cargarJsonRecibos = () => {
//     // guarda el array de objetos 'Recibo' en localStorage
//     localStorage.setItem(lsRecibos, JSON.stringify(jsonRecibos.recibos));
//     // arma la tabla de recibos
//     armarTablaRecibos(jsonRecibos.recibos);
//  };

const urlJson = '../data/recibos.json';

// // --- metodo 2) JAVASCRIPT
// const cargarJsonRecibos = () => {

//     let jsonData = localStorage.getItem(lsRecibos);

//     // verifica si existe el json de recibos en local storage
//     if (jsonData == null || jsonData == undefined) {   // si no existe lo carga del json externo

//         console.log('... cargando local storage de .json externo...');

//         fetch(urlJson)
//         .then(response => response.json())
//         .then(data => {
//             // guarda el array de objetos 'Recibo' en localStorage
//             localStorage.setItem(lsRecibos, JSON.stringify(data.recibos));
//             // arma la tabla de recibos
//             armarTablaRecibos(data.recibos);
//         })
//         .catch(console.error);
//     } else {                                           // si existe lo parsea
//         // arma la tabla de recibos
//         armarTablaRecibos(JSON.parse(jsonData));
//     };
// };

// --- metodo 3) JQUERY
const cargarJsonRecibos = () => {

  let jsonData = localStorage.getItem(lsRecibos);
  // console.log(jsonData);

  // verifica si existe el json de recibos en local storage
  if (jsonData == null || jsonData === undefined) {   // si no existe lo carga del json externo

      console.log('... cargando local storage de .json externo...');

      $.get(urlJson, function(data, estado) {
          if (estado === "success") {
              // console.log(respuesta.recibos);
              // guarda el array de objetos 'Recibo' en localStorage
              localStorage.setItem(lsRecibos, JSON.stringify(data.recibos));
              // arma la tabla de recibos
              armarTablaRecibos(data.recibos);
          }
      })
  } else {                                           // si existe lo parsea
      // arma la tabla de recibos
      armarTablaRecibos(JSON.parse(jsonData));
  };
};

// carga tabla de recibos desde array de recibos
const armarTablaRecibos = (arrayObj) => {

  let tablaRecibos = document.querySelector("#tablaRecibos");
  let tbody = document.createElement("tbody");
  tablaRecibos.appendChild(tbody);

//   console.log(arrayObj);

  for (let ii = 0; ii < arrayObj.length; ii++) {
      let tr = document.createElement("tr");

      // columna de checkbox
      let td = document.createElement("td");
      td.innerHTML = '<input type="checkbox" />';
      td.classList.add("tm-col-checkbox");
      tr.appendChild(td);

      let recibo = arrayObj[ii];

      // busca la liquidacion segun el idLiquidacion
      let liquidacion = utiles.getLiquidacion(recibo.idLiquidacion);

      // busca el empleado segun el legajo
      let empleado = utiles.getEmpleado(recibo.legajo);

      for (let e in recibo) {

          if (recibo.hasOwnProperty(e)) {
              
            let td = document.createElement("td");
              
            if (e == 'id') {     // los id no los muestra, estan ocultos
                td.classList.add("oculto");
            }
              
            if (e == 'legajo') {
                // carga legajo
                td.innerHTML = `#${recibo[e]}`
                td.classList.add("tm-recibo-bold", "tm-col-recibo", `tm-col-${e}`);
                td.style.cursor = "pointer";
                tr.appendChild(td);
                // y carga nombre
                td = document.createElement("td");
                td.classList.add("tm-recibo-bold", "tm-col-nombre");
                td.innerHTML = empleado.nombre; 
            } else {
              // agrega la columna a la fila con una clase con el nombre del atributo de clase
              td.classList.add(`tm-col-${e}`);
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
                td.classList.add("tm-col-periodo");
                td.innerHTML = liquidacion.periodo;
            }
                  
            // semaforo de estado y periodo de liquidacion
            if (e == 'estado') {
                td.innerHTML = utiles.generateDivEstado(recibo[e]);
                // td.classList.add("tm-col-estado");
            }

            if (recibo.estado == "activo") {
              // agrega clase al campo para uso futuro y convierte cursor tipo manito
              td.classList.add("tm-col-recibo");
              td.style.cursor = "pointer";
            }

            tr.appendChild(td);
          }
      }

      // columna con icono de eliminar
      td = document.createElement("td");
      td.innerHTML = '<a href="#" class="tm-recibo-delete-link">' +
                      '<i class="far fa-trash-alt tm-recibo-delete-icon" />' +
                  '</a>';
      td.classList.add("tm-col-delete");
      tr.appendChild(td);

      // agrega clase a la fila para usar con el "click"
      tr.classList.add("tm-fila-recibo");
      tbody.appendChild(tr);
  }

}

// carga los recibos desde el .json y arma tabla de recibos
window.onload=cargarJsonRecibos();

// eventos de fila de tabla
$(function() {

  // reenvia a la pagina edit-liquidacion.html (jquery)
  $(".tm-fila-recibo").on("click", function() {
      let tabla = document.getElementById("tablaRecibos");  
      let fila = $(this).closest('tr')[0];   // guarda la fila seleccionada
      // console.log(fila);

      let tds = fila.querySelectorAll("td");

      const recibo = new Recibo(); 
      recibo.id = fila.querySelector(".tm-col-id").innerText;                            // oculto
      recibo.legajo = fila.querySelector(".tm-col-legajo").innerText.replace('#', ''); 
      // recibo.nombre = fila.querySelector(".tm-col-nombre").innerText; 
      recibo.idLiquidacion = fila.querySelector(".tm-col-idLiquidacion").innerText;     // oculto
    //   recibo.periodo = fila.querySelector(".tm-col-periodo").innerText; 
      recibo.estado = fila.querySelector(".tm-col-estado").innerText;
      recibo.bruto = fila.querySelector(".tm-col-bruto").innerText; 
      recibo.descuento = fila.querySelector(".tm-col-descuento").innerText; 
      recibo.neto = fila.querySelector(".tm-col-neto").innerText; 
        
    //   console.log(`recibo: ${recibo.mostrar()}`);
      
      if (recibo.estado == "Activo") {
        // console.log(`objRecibo: ${JSON.stringify(recibo)}`);
        sessionStorage.setItem("objRecibo", JSON.stringify(recibo));
        // console.log('window.location.href = "edit-recibo.html"');
        window.location.href = "edit-recibo.html";
      }
  });

  // anula el evento click para el checkbox
  $(".tm-fila-recibo").on("click", ".tm-col-checkbox", function(e) { 
    // console.log('se hizo click en "tm-col-checkbox"');
    e.stopPropagation() 
  });

  // anula el evento click para el boton delete
  $(".tm-fila-recibo").on("click", ".tm-col-delete", function(e) { 
    // console.log('se hizo click en "tm-col-delete"');
    e.stopPropagation() 
  });

  // cambia el color de fila editable
  $(".tm-fila-recibo").on("mouseover", function() { 
    // console.log('se hizo click en "onmouseover"');
    let estado = this.querySelector(".tm-col-estado").innerText;
    if (estado == 'Activo') {
      $(this).css({
        'background-color': '#6987a5'
      });
    }
  });

  // restaura el color de fila editable
  $(".tm-fila-recibo").on("mouseout", function() { 
    // console.log('se hizo click en "onmouseover"');
    $(this).css({
      'background-color': '#4f667c'
    });
  });
  
});

export { Recibo };
