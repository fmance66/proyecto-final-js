/* Proyecto Final: Interprete de fórmulas tipo Excel
   Las formulas vienen en un string y devuelven un resultado
   
   Operadores:
    +  --> suma 
    -  --> resta
    *  --> multiplicacion
    /  --> division 
    ^  --> potenciacion

   Variables:
    : --> identificador
    
    ej: :IMPORTE, :FECHA_TOPE  etc

   Condicional (no desarrollado todavía):

    SI(<condicion>;<sentencia por TRUE>;<sentencia por FALSE>)

    ej: SI(:IMPORTE > 100; IMPORTE; IMPORTE * 1.1)

*/

/* Proyecto Final: Interprete de fórmulas tipo Excel
   Las formulas vienen en un string y devuelven un resultado
   
   Operadores:
    +  --> suma 
    -  --> resta
    *  --> multiplicacion
    /  --> division 
    ^  --> potenciacion

   Variables:
    : --> identificador
    
    ej: :IMPORTE, :FECHA_TOPE  etc

   Condicional (no desarrollado todavía):

    SI(<condicion>;<sentencia por TRUE>;<sentencia por FALSE>)

    ej: SI(:IMPORTE > 100; IMPORTE; IMPORTE * 1.1)

*/

// librerias
import * as utiles   from './src/utiles.js';
 
// carga file JSON de datos 
import arrayRecibos from './data/recibos.json' assert { type: "json" };

const lsRecibos = "lsRecibos";

// carga tabla de recibos read only desde array de recibos
const cargarTablaRecibosRo = () => {

    // guarda el array de objetos 'Recibo' obtenido desde el JSON externo en localStorage
    utiles.SetEnLocalStorage(lsRecibos, JSON.stringify(arrayRecibos.recibos));

    let tablaRecibos = document.querySelector("#tablaRecibosIndex");
    let tbody = document.createElement("tbody");
    tablaRecibos.appendChild(tbody);

    for (let ii = 0; ii < arrayRecibos.recibos.length; ii++) {
        let tr = document.createElement("tr");
        let recibo = arrayRecibos.recibos[ii];
        for (let e in recibo) {

            if (recibo.hasOwnProperty(e)) {
                if ((e == 'id') || (e == 'idLiquidacion')) {     // los id no los carga en la tabla
                    continue;
                }
                let td = document.createElement("td");
                if (e == 'legajo') {
                    td.innerHTML = `#${recibo[e]}`
                } else {
                    td.innerHTML = recibo[e]
                }
                if (e == 'legajo' || e == 'nombre' || e == 'periodo') {
                    td.classList.add("tm-recibo-bold");
                }
                tr.appendChild(td);
            }
        }

        // agrega la columna de estado
        let td = document.createElement("td");
        td.innerHTML = utiles.GenerateDivEstado(recibo['neto']);
        tr.appendChild(td);

        tbody.appendChild(tr);
    }

}

// carga tabla de recibos read only
window.onload=cargarTablaRecibosRo();

