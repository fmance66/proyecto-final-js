/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from '../src/utiles.js';

// carga file JSON de datos 
import jsonRecibos from '../data/recibos.json' assert { type: "json" };
// import jsonLiquidaciones from '../data/liquidaciones.json' assert { type: "json" };
// import jsonEmpleados from '../data/empleados.json' assert { type: "json" };

let arrayRecibos = jsonRecibos.recibos;
// let arrayLiquidaciones = jsonLiquidaciones.liquidaciones;
// let arrayEmpleados = jsonEmpleados.empleados;

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
  localStorage.setItem(lsRecibos, JSON.stringify(arrayRecibos));

  let tablaRecibos = document.querySelector("#tablaRecibos");
  let tbody = document.createElement("tbody");
  tablaRecibos.appendChild(tbody);

//   console.log(arrayRecibos);
//   console.log(arrayLiquidaciones);
//   console.log(arrayEmpleados);

  for (let ii = 0; ii < arrayRecibos.length; ii++) {
      let tr = document.createElement("tr");

      // columna de checkbox
      let td = document.createElement("td");
      td.innerHTML = '<input type="checkbox" />';
      td.classList.add("tm-col-checkbox");
      tr.appendChild(td);

      let recibo = arrayRecibos[ii];

      // busca la liquidacion segun el idLiquidacion
      // let liquidacion = utiles.getLiquidacion(arrayLiquidaciones, recibo.idLiquidacion);
      let liquidacion = utiles.getLiquidacion(recibo.idLiquidacion);

      // busca el empleado segun el legajo
      // let empleado = utiles.getEmpleado(arrayEmpleados, recibo.legajo);
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

// carga tabla de recibos
window.onload=cargarTablaRecibos();

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

export { Recibo, lsRecibos };
