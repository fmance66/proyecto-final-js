/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/
 
import * as utiles from './utiles.js';
import * as tipoVariable from './tipoVariable.js';
  
function Variable (id, nombre, valor, idTipoVariable, estado) {
  this.id = id;
  this.nombre = nombre;
  this.valor  = valor;
  this.idTipoVariable = idTipoVariable;
  this.estado = estado;
  this.mostrar = function() {
      return (
      `{ id: ${this.id}, nombre: ${this.nombre}, valor: ${this.valor},` +
      ` idTipoVariable: ${this.idTipoVariable}, estado: ${this.estado} }`
      )
  }
}


// carga tabla de variables desde array de variables obtenido de json externo
const armarTablaVariables = (arrayObj) => {

    let tablaVariables = document.querySelector("#tablaVariables");
    let tbody = document.createElement("tbody");
    tablaVariables.appendChild(tbody);
    
    // console.log(arrayObj);

    for (let ii = 0; ii < arrayObj.length; ii++) {
        let tr = document.createElement("tr");

        // columna de checkbox
        let td = document.createElement("td");
        td.innerHTML = '<input type="checkbox" />';
        td.classList.add("tm-col-checkbox");
        tr.appendChild(td);

        // columnas de la tabla con datos
        let variable = arrayObj[ii];

        // busca el tipo de variable según el idTipoVariable
        let tipoVariable = utiles.getTipoVariable(variable.idTipoVariable);

        for (let e in variable) {

            if (variable.hasOwnProperty(e)) {

                let td = document.createElement("td");

                if (e == 'id') {     // el id no lo muestra, esta oculto
                    td.classList.add("oculto");
                }
              
                // oculta el id y muestra la descripcion del tipo de variable
                if (e == 'idTipoVariable') {     
                    // carga idTipoVariable oculto
                    td.innerHTML = variable.idTipoVariable;
                    td.classList.add("oculto", `tm-col-${e}`);
                    tr.appendChild(td);
                    // carga la descripcion del tipo de variable
                    td = document.createElement("td");
                    td.classList.add("tm-col-descripcion");
                    td.innerHTML = tipoVariable.descripcion;
                } else {
                    // agrega la columna a la fila con una clase con el nombre del atributo de clase
                    td.classList.add(`tm-col-${e}`);
                    td.innerHTML = variable[e];
                }

                if (e == 'nombre') {
                    td.classList.add("tm-variable-bold");
                }; 
                  
                // semaforo de estado
                if (e == 'estado') {
                    td.innerHTML = utiles.generateDivEstado(variable[e]);
                }

                // agrega clase al campo y convierte cursor para usar con el "click"
                // agrega la columna a la fila con una clase con el nombre del atributo de clase
                if (variable.estado == "activo") {
                  td.classList.add("tm-col-variable");
                  td.style.cursor = "pointer";
                }
  
                tr.appendChild(td);                
            }
        }

        // columna con icono de eliminar
        td = document.createElement("td");
        td.innerHTML = '<a href="#" class="tm-variable-delete-link">' +
                        '<i class="far fa-trash-alt tm-variable-delete-icon" />' +
                    '</a>';
        td.classList.add("tm-col-delete");
        tr.appendChild(td);

        // agrega clase a la fila para usar en un futuro
        tr.classList.add("tm-fila-variable");

        tbody.appendChild(tr);
    }
}

// eventos de fila de tabla
$(function() {

  // reenvia a la pagina edit-liquidacion.html (jquery)
  $(".tm-fila-variable").on("click", function() {
      let tabla = document.getElementById("tablaVariables");  
      let fila = $(this).closest('tr')[0];   // guarda la fila seleccionada
      console.log(fila);

      let tds = fila.querySelectorAll("td");

      const variable = new Variable(); 
      variable.id = fila.querySelector(".tm-col-id").innerText;                           // oculto
      variable.nombre = fila.querySelector(".tm-col-nombre").innerText;               
      variable.valor = fila.querySelector(".tm-col-valor").innerText;               
      variable.idTipoVariable = fila.querySelector(".tm-col-idTipoVariable").innerText;   // oculto
      // variable.tipoVariable = fila.querySelector(".tm-col-tipoVariable").innerText;               
      variable.estado = fila.querySelector(".tm-col-estado").innerText;

      // console.log(`variable: ${variable.mostrar()}`);
      
      if (variable.estado == "Activo") {
        // console.log(`objVariable: ${JSON.stringify(variable)}`);
        sessionStorage.setItem("objVariable", JSON.stringify(variable));
      //   console.log('window.location.href = "edit-variable.html"');
        window.location.href = "edit-variable.html";
      }
  });
    
  // anula el evento click para el checkbox
  $(".tm-fila-variable").on("click", ".tm-col-checkbox", function(e) { 
    // console.log('se hizo click en "tm-col-checkbox"');
    e.stopPropagation() 
  });

  // anula el evento click para el boton delete
  $(".tm-fila-variable").on("click", ".tm-col-delete", function(e) { 
    // console.log('se hizo click en "tm-col-delete"');
    e.stopPropagation() 
  });

  // cambia el color de fila editable
  $(".tm-fila-variable").on("mouseover", function() { 
      let estado = this.querySelector(".tm-col-estado").innerText;
      if (estado == 'Activo') {
        $(this).css({
          'background-color': '#6987a5'
        });
      }
    });
    
  // restaura el color de fila editable
  $(".tm-fila-variable").on("mouseout", function() { 
    $(this).css({
      'background-color': '#4f667c'
    });
  });
    
});

// carga tabla de variables y tabla html
function start() {
  let arrayTipoVariables = utiles.getListaTipoVariables();
  tipoVariable.armarTablaTipoVariables(arrayTipoVariables);
  let arrayVariables = utiles.getListaVariables();
  armarTablaVariables(arrayVariables);
};

 window.onload = start();


export { Variable };
