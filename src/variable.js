/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/
 
import * as utiles from'../src/utiles.js';

// carga file JSON de datos 
import arrayVariables from '../data/variables.json' assert { type: "json" };
import arrayTipoVariables from '../data/tipoVariables.json' assert { type: "json" };

const lsVariables = "lsVariables";
const lsTipoVariables = "lsTipoVariables";
  
const Variable = (id, nombre, valor) => {
  this.id = id;
  this.nombre = nombre;
  this.valor  = valor;
  this.mostrar = function() {
      `{ id: ${this.id}, nombre: ${this.nombre}, valor: ${this.valor} }`
  }
}
  
const TipoVariable = (id, descripcion) => {
  this.id = id;
  this.descripcion = descripcion;
  this.mostrar = function() {
      `{ id: ${this.id}, descripcion: ${this.descripcion} }`
  }
}


// carga tabla de variables desde array de variables obtenido de json externo
const cargarTablaVariables = () => {

    // guarda el array de objetos 'Variable' obtenido desde el JSON externo en localStorage
    utiles.SetEnLocalStorage(lsVariables, JSON.stringify(arrayVariables.variables));

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
        for (let e in variable) {

            if (variable.hasOwnProperty(e)) {
                if (e == 'id') {     // el id no lo carga en la tabla
                    continue;
                }
                let td = document.createElement("td");
                td.innerHTML = variable[e];
                if (e == 'nombre') {
                    td.classList.add("tm-variable-bold", "tm-nombre-variable");
                } else {
                    td.classList.add("tm-variable-bold");
                }; 

                tr.appendChild(td);
            }
        }

        // columna con icono de eliminar
        td = document.createElement("td");
        td.innerHTML = '<a href="#" class="tm-variable-delete-link">' +
                        '<i class="far fa-trash-alt tm-variable-delete-icon" />' +
                    '</a>';
        tr.appendChild(td);

        tbody.appendChild(tr);
    }
}

// carga tabla de tipos de variables desde array obtenido de json externo
const cargarTablaTipoVariables = () => {
    // guarda el array de objetos 'TipoVariable' obtenido desde el JSON externo en localStorage
    utiles.SetEnLocalStorage(lsTipoVariables, JSON.stringify(arrayTipoVariables.tipoVariables));
    
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
                if (e == 'id') {     // el id no lo carga en la tabla
                    continue;
                }
                let td = document.createElement("td");
                td.innerHTML = tipoVariable[e];
                if (e == 'descripcion') {
                    td.classList.add("tm-variable-bold", "w-100", "tm-nombre-variable");
                } else {
                    td.classList.add("tm-nombre-variable");
                }; 
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

// export { Variable, lsVariables, cargarTablaVariables, cargarTablaTipoVariables };
export { Variable, lsVariables };
