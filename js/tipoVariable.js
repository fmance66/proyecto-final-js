/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/
 
import * as utiles from'./utiles.js';

const lsTipoVariables = "lsTipoVariables";
  
function TipoVariable (id, descripcion, estado) {
  this.id = id;
  this.descripcion = descripcion;
  this.estado = estado;
  this.mostrar = function() {
      `{ id: ${this.id}, descripcion: ${this.descripcion}, estado: ${this.estado} }`
  }
}

// carga tabla de tipos de variables desde array obtenido de json externo
const armarTablaTipoVariables = (arrayObj) => {
    
    // carga table de variables desde array de variables
    let tablaTipoVariables = document.querySelector("#tablaTipoVariables");
    let tbody = document.createElement("tbody");
    tablaTipoVariables.appendChild(tbody);
    
    // console.log(arrayObj);

    for (let ii = 0; ii < arrayObj.length; ii++) {
        let tr = document.createElement("tr");

        // columnas de la tabla con datos
        let tipoVariable = arrayObj[ii];

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

                // agrega la columna a la fila con una clase con el nombre del atributo de clase
                td.classList.add(`tm-col-${e}`);
                tr.appendChild(td);
            }
        }

        // columna con icono de eliminar
        let td = document.createElement("td");
        td.innerHTML = '<a href="#" class="tm-variable-delete-link">' +
                        '<i class="far fa-trash-alt tm-variable-delete-icon"/>' +
                    '</a>';
        td.classList.add("tm-col-delete");
        tr.appendChild(td);

        // // agrega clase a la fila para usar en el click (uso futuro)
        tr.classList.add("tm-fila-tipo-variable");
        tbody.appendChild(tr);
    }
}
 
// reenvia a la pagina edit-liquidacion.html (jquery)
$(".tm-fila-tipo-variable").on("click", function() {
    let tabla = document.getElementById("tablaTipoVariables");  
    let fila = $(this).closest('tr')[0];   // guarda la fila seleccionada
    // console.log(fila);

    let tds = fila.querySelectorAll("td");

    const tipoVariable = new TipoVariable(); 
    tipoVariable.id = fila.querySelector(".tm-col-id").innerText;             // oculto
    tipoVariable.descripcion = fila.querySelector(".tm-col-descripcion").innerText;
    variable.estado = fila.querySelector(".tm-col-estado").innerText;

    // console.log(`tipoVariable: ${tipoVariable.mostrar()}`);
    
    if (tipoVariable.estado == "Activo") {
    //   console.log(`objVariable: ${JSON.stringify(variable)}`);
      sessionStorage.setItem("objTipoVariable", JSON.stringify(tipoVariable));
    //   console.log('window.location.href = "edit-variable.html"');
      // window.location.href = "edit-variable.html";
    }
});
  
// anula el evento click para el boton delete
$(".tm-fila-tipo-variable").on("click", ".tm-col-delete", function(e) { 
  // console.log('se hizo click en "tm-col-delete"');
  e.stopPropagation() 
});
   

export { TipoVariable, armarTablaTipoVariables };
