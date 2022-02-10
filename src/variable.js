/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/
 
import * as utiles from'../src/utiles.js';

// carga file JSON de datos 
import arrayVariables from '../data/variables.json' assert { type: "json" };
import arrayTipoVariables from '../data/tipoVariables.json' assert { type: "json" };

const lsVariables = "lsVariables";
const lsTipoVariables = "lsTipoVariables";
  
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
  
function TipoVariable (id, descripcion, estado) {
  this.id = id;
  this.descripcion = descripcion;
  this.estado = estado;
  this.mostrar = function() {
      `{ id: ${this.id}, descripcion: ${this.descripcion}, estado: ${this.estado} }`
  }
}

// carga tabla de variables desde array de variables obtenido de json externo
const cargarTablaVariables = () => {

    // guarda el array de objetos 'Variable' obtenido desde el JSON externo en localStorage
    localStorage.setItem(lsVariables, JSON.stringify(arrayVariables.variables));

    let tablaVariables = document.querySelector("#tablaVariables");
    let tbody = document.createElement("tbody");
    tablaVariables.appendChild(tbody);
    
    // console.log(arrayVariables.variables);

    for (let ii = 0; ii < arrayVariables.variables.length; ii++) {
        let tr = document.createElement("tr");

        // columna de checkbox
        let td = document.createElement("td");
        td.innerHTML = '<input type="checkbox" />';
        tr.appendChild(td);

        // columnas de la tabla con datos
        let variable = arrayVariables.variables[ii];

        // busca el tipo de variable según el idTipoVariable
        let tipoVariable = utiles.getTipoVariable(arrayTipoVariables.tipoVariables, 
                                                  variable.idTipoVariable);

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
                    td.classList.add("oculto");
                    tr.appendChild(td);
                    // carga la descripcion del tipo de variable
                    td = document.createElement("td");
                    td.innerHTML = tipoVariable.descripcion;
                } else {
                    td.innerHTML = variable[e];
                }

                if (e == 'nombre') {
                    td.classList.add("tm-variable-bold", "tm-nombre-variable");
                } else {
                    td.classList.add("tm-variable-bold");
                }; 
                  
                // semaforo de estado
                if (e == 'estado') {
                    td.innerHTML = utiles.generateDivEstado(variable[e]);
                }

                // agrega clase al campo y convierte cursor para usar con el "click"
                td.classList.add("tm-col-variable");
                td.style.cursor = "pointer";

                tr.appendChild(td);
            }
        }

        // columna con icono de eliminar
        td = document.createElement("td");
        td.innerHTML = '<a href="#" class="tm-variable-delete-link">' +
                        '<i class="far fa-trash-alt tm-variable-delete-icon" />' +
                    '</a>';

        tr.appendChild(td);

        // agrega clase a la fila para usar en un futuro
        tr.classList.add("tm-fila-variable");

        tbody.appendChild(tr);
    }
}

// carga tabla de tipos de variables desde array obtenido de json externo
const cargarTablaTipoVariables = () => {
    // guarda el array de objetos 'TipoVariable' obtenido desde el JSON externo en localStorage
    localStorage.setItem(lsTipoVariables, JSON.stringify(arrayTipoVariables.tipoVariables));
    
    // carga table de variables desde array de variables
    let tablaTipoVariables = document.querySelector("#tablaTipoVariables");
    let tbody = document.createElement("tbody");
    tablaTipoVariables.appendChild(tbody);
    
    // console.log(arrayTipoVariables.tipoVariables);

    for (let ii = 0; ii < arrayTipoVariables.tipoVariables.length; ii++) {
        let tr = document.createElement("tr");

        // columnas de la tabla con datos
        let tipoVariable = arrayTipoVariables.tipoVariables[ii];

        for (let e in tipoVariable) {

            if (tipoVariable.hasOwnProperty(e)) {

                let td = document.createElement("td");

                if (e == 'id') {     // el id no lo muestra, esta oculto
                    td.classList.add("oculto");
                }

                td.innerHTML = tipoVariable[e];

                if (e == 'descripcion') {
                    td.classList.add("tm-variable-bold", "w-100", "tm-nombre-variable");
                } else {
                    td.classList.add("tm-nombre-variable");
                }; 
                  
                // semaforo de estado
                if (e == 'estado') {
                    td.innerHTML = utiles.generateDivEstado(tipoVariable[e]);
                }

                tr.appendChild(td);
            }
        }

        // columna con icono de eliminar
        let td = document.createElement("td");
        td.innerHTML = '<a href="#" class="tm-variable-delete-link">' +
                        '<i class="far fa-trash-alt tm-variable-delete-icon"/>' +
                    '</a>';

        tr.appendChild(td);

        tbody.appendChild(tr);
    }
}
  
// carga tabla de variables y tipos de variables
const cargarTablaVariablesAll = () => {
    cargarTablaVariables();
    cargarTablaTipoVariables();
}

// carga tabla de variables y tipos de variables
// window.onload=cargarTablaVariablesAll();
cargarTablaVariablesAll();

// agrega a cada fila de la tabla el onclick 
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
  
  onRowClick("tablaVariables", function(fila) {
  
    let tds = fila.querySelectorAll("td");
    let estado = tds[6].innerText;
  
    // recorre el tr sacando el 1er y ultimo elemento (checkbox y boton eliminar)
    for (let ii = 1; ii < tds.length - 1; ii++) {
      console.log(`ii: ${ii} tds: ${tds[ii].innerText}`);
    }
  
    const variable = new Variable(); 
    variable.id = tds[1].innerText;                  // oculto
    variable.nombre = tds[2].innerText;               
    variable.valor = tds[3].innerText;               
    variable.idTipoVariable = tds[4].innerText;      // oculto
    // variable.tipoVariable = tds[5].innerText;               
    variable.estado = tds[6].innerText;               

    // console.log(`variable: ${variable.mostrar()}`);
    
    if (estado == "Activo") {
    //   console.log(`objVariable: ${JSON.stringify(variable)}`);
      sessionStorage.setItem("objVariable", JSON.stringify(variable));
    //   console.log('window.location.href = "edit-variable.html"');
      window.location.href = "edit-variable.html";
    }
  
  });
  

// export { Variable, lsVariables, cargarTablaVariablesAll };
export { Variable, lsVariables };
