/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from './utiles.js';

// const lsLiquidaciones = "lsLiquidaciones";
  
function Liquidacion(id, periodo, descripcion, idTipoLiquidacion, estado, fechaPago) {
  this.id = id;
  this.periodo = periodo;
  this.descripcion = descripcion;
  this.idTipoLiquidacion = idTipoLiquidacion;
  this.estado = estado;
  this.fechaPago  = fechaPago;
  this.mostrar = function() {
    return (
      `{ id: ${this.id}, periodo: ${this.periodo},descripcion: ${this.descripcion},` + 
      `  idTipoLiquidacion: ${this.idTipoLiquidacion}, estado: ${this.estado}, fechaPago: ${this.fechaPago} }`
      )
  }
}

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

      // busca el tipo de liquidacion segun el idTipoLiquidacion
      let tipoLiquidacion = utiles.getTipoLiquidacion(liquidacion.idTipoLiquidacion);

      for (let e in liquidacion) {

          if (liquidacion.hasOwnProperty(e)) {

              let td = document.createElement("td");
              
              // oculta el idTipoLiquidacion y muestra la descripcion del tipo de liquidacion
              if (e == 'idTipoLiquidacion') {     
                // carga idTipoLiquidacion oculto
                td.innerHTML = liquidacion.idTipoLiquidacion;
                td.classList.add("oculto", `tm-col-${e}`);
                tr.appendChild(td);
                // carga la descripcion del idTipoLiquidacion
                td = document.createElement("td");
                td.classList.add("tm-col-tipoLiquidacion");
                td.innerHTML = tipoLiquidacion.descripcion;
              } else {
                // agrega la columna a la fila con una clase con el nombre del atributo de clase
                td.classList.add(`tm-col-${e}`);
                if (e == 'id') {
                  td.innerHTML = `#${liquidacion[e]}`
                } else {
                    td.innerHTML = liquidacion[e]
                }
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
function start() {
  // let arrayTipoLiquidaciones = utiles.getListaTipoLiquidaciones();
  let arrayLiquidaciones = utiles.getListaLiquidaciones();
  armarTablaLiquidaciones(arrayLiquidaciones);
};

 window.onload = start();


// // eventos de fila de tabla
$(function() {

  // reenvia a la pagina edit-liquidacion.html (jquery)
  $(".tm-fila-liquidacion").on("click", function(e) {

      // console.log('click en tablaLiquidaciones');

      // obtengo la fila seleccionada (tr )donde se hizo el click
      let fila = e.target.parentNode;
      // console.log(fila);

      let tds = fila.querySelectorAll("td");

      const liquidacion = new Liquidacion(); 
      liquidacion.id = parseInt(fila.querySelector(".tm-col-id").innerText.replace('#',''));
      liquidacion.periodo = fila.querySelector(".tm-col-periodo").innerText;
      liquidacion.descripcion = fila.querySelector(".tm-col-descripcion").innerText;
      liquidacion.idTipoLiquidacion = parseInt(fila.querySelector(".tm-col-idTipoLiquidacion").innerText);    // oculto
      // liquidacion.tipoLiquidacion = fila.querySelector(".tm-col-tipoLiquidacion").innerText;               
      liquidacion.estado = fila.querySelector(".tm-col-estado").innerText.toLowerCase();
      liquidacion.fechaPago = fila.querySelector(".tm-col-fechaPago").innerText;

      // console.log(`liquidacion: ${liquidacion.mostrar()}`);
      
      if (liquidacion.estado == "abierta") {
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
    console.log('se hizo click en "tm-col-delete"');
    e.stopPropagation(); 
    
    console.log('va a ejecutar eliminarLiquidacion()...');

    // obtengo la fila seleccionada (tr )donde se hizo el click
    let fila = e.target.parentNode.parentNode.parentNode;
    let id = parseInt(fila.querySelector(".tm-col-id").innerText.replace('#',''));
    // elimina la fila del array y actualiza el localStorage
    utiles.eliminarLiquidacion(id);
    // elimina la fila de la tabla html
    fila.remove();
    // mensaje de exito
    toastr.options = {
      "closeButton": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": true,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "2000",
    }
    toastr.success('El registro fue eliminada con éxito...','Eliminar liquidación');
  });

  // cambia el color de fila editable
  $(".tm-fila-liquidacion").on("mouseover", function() { 
    // console.log('se hizo click en "onmouseover"');
    let estado = this.querySelector(".tm-col-estado").innerText;
    // console.log('mouseover on: ', estado);
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
