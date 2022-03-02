/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from './utiles.js';
import { Recibo } from './models/recibo.js';
import { EmpleadoController } from './controllers/empleadoController.js';
import { LiquidacionController } from './controllers/liquidacionController.js';
import { ReciboController } from './controllers/reciboController.js';

const urlJson = '../data/recibos.json';
const lsName = "lsRecibos";


const cargarSelectLiquidacion = () => {

  let liquidacionSelect = document.querySelector('#selLiquidacion');
  const liquidaciones = new LiquidacionController();

  liquidaciones.getAll().forEach(function(liquidacion) {
    let opcion = document.createElement('option');
    opcion.value = liquidacion.id;
    opcion.text = liquidacion.descripcion;
    liquidacionSelect.add(opcion);
  });

  console.log('liquidacionSelect', liquidacionSelect);

  // propone la última liquidacion como default
  liquidacionSelect.value = liquidaciones.liquidaciones[liquidaciones.liquidaciones.length - 1].id;

  return liquidacionSelect.value;
};

// carga tabla de recibos desde array de recibos
const armarTablaHTML = (idTabla, recibos) => {

  let tablaRecibos = document.querySelector(idTabla);

  let tbody = document.createElement("tbody");
  tbody.setAttribute("id", "tablaRecibosBody");
  tablaRecibos.appendChild(tbody);

  for (const recibo of recibos.recibos) {

    let tr = document.createElement("tr");

    // columna de checkbox
    let td = document.createElement("td");
    td.innerHTML = '<input type="checkbox" />';
    td.classList.add("tm-col-checkbox");
    tr.appendChild(td);

    // busca la liquidacion segun el idLiquidacion
    const liquidaciones = new LiquidacionController();
    let liquidacion = liquidaciones.get(recibo.idLiquidacion);

    // busca el empleado segun el legajo
    const empleados = new EmpleadoController();
    let empleado = empleados.get(recibo.legajo);

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
const iniciar = () => {
  // carga el select de liquidaciones filtrado por idLiquidacion
  let idLiquidacion = cargarSelectLiquidacion();
  const recibos = new ReciboController();
  recibos.recibos = recibos.getAll(idLiquidacion);
  armarTablaHTML("#tablaRecibos", recibos);
}

// arma tabla html dinamica (read only) desde las liquidaciones en localStorage
window.onload = iniciar();

// eventos de fila de tabla
$(function() {

  // reenvia a la pagina edit-liquidacion.html (jquery)
  $(".tm-fila-recibo").on("click", function() {
      let tabla = document.getElementById("tablaRecibos");  
      let fila = $(this).closest('tr')[0];   // guarda la fila seleccionada
      console.log(fila);

      let tds = fila.querySelectorAll("td");

      const recibo = new Recibo({
        id: parseInt(fila.querySelector(".tm-col-id").innerText),                            // oculto
        legajo: fila.querySelector(".tm-col-legajo").innerText.replace('#', ''), 
        // nombre = fila.querySelector(".tm-col-nombre").innerText, 
        idLiquidacion: parseInt(fila.querySelector(".tm-col-idLiquidacion").innerText),     // oculto
      //   periodo = fila.querySelector(".tm-col-periodo").innerText, 
        estado: fila.querySelector(".tm-col-estado").innerText,
        bruto: fila.querySelector(".tm-col-bruto").innerText,
        descuento: fila.querySelector(".tm-col-descuento").innerText,
        neto: fila.querySelector(".tm-col-neto").innerText
      }); 
        
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

// cambio la seleccion de liquidacion
$("#selLiquidacion").on("change", function() { 
  // vacia la tabla html
  $("#tablaRecibos").empty();
  // carga la tabla html con el idLiquidacion seleccionado
  let idLiquidacion = this.value;
  const recibos = new ReciboController();
  recibos.recibos = recibos.getAll(idLiquidacion);
  armarTablaHTML("#tablaRecibos", recibos);
});

