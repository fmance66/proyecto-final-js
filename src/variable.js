/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/
 
import * as utiles from'../src/utiles.js';

const lsVariables = "lsVariables";
  
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

//***** carga file JSON de datos 

// import jsonVariables from '../data/variables.json' assert { type: "json" };

// --- metodo 1) IMPORT
// const cargarJsonVariables = () => {
//     // guarda el array de objetos 'Variable' en localStorage
//     localStorage.setItem(lsVariables, JSON.stringify(jsonVariables.variables));
//     // arma la tabla de variables
//     armarTablaVariables(jsonVariables.variables);
//  };

const urlJson = '../data/variables.json';

// // --- metodo 2) JAVASCRIPT
// const cargarJsonVariables = () => {

//     let jsonData = localStorage.getItem(lsVariables);

//     // verifica si existe el json de variables en local storage
//     if (jsonData == null || jsonData == undefined) {   // si no existe lo carga del json externo

//         console.log('... cargando local storage de .json externo...');

//         fetch(urlJson)
//         .then(response => response.json())
//         .then(data => {
//             // guarda el array de objetos 'Variable' en localStorage
//             localStorage.setItem(lsVariables, JSON.stringify(data.variables));
//             // arma la tabla de variables
//             armarTablaVariables(data.variables);
//         })
//         .catch(console.error);
//     } else {                                           // si existe lo parsea
//         // arma la tabla de variables
//         armarTablaVariables(JSON.parse(jsonData));
//     };
// };

// --- metodo 3) JQUERY
const cargarJsonVariables = () => {

  let jsonData = localStorage.getItem(lsVariables);
  // console.log(jsonData);

  // verifica si existe el json de variables en local storage
  if (jsonData == null || jsonData === undefined) {   // si no existe lo carga del json externo

      console.log('... cargando local storage de .json externo...');

      $.get(urlJson, function(data, estado) {
          if (estado === "success") {
              // console.log(respuesta.variables);
              // guarda el array de objetos 'Variable' en localStorage
              localStorage.setItem(lsVariables, JSON.stringify(data.variables));
              // arma la tabla de variables
              armarTablaVariables(data.variables);
          }
      })
  } else {                                           // si existe lo parsea
      // arma la tabla de variables
      armarTablaVariables(JSON.parse(jsonData));
  };
};


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

// carga tabla de variables y tipos de variables
window.onload=cargarJsonVariables();

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

export { Variable, lsVariables };
