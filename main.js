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

const lsLiquidaciones = "lsLiquidaciones";

//***** carga file JSON de datos 

// import jsonLiquidaciones from './data/liquidaciones.json' assert { type: "json" };

// --- metodo 1) IMPORT
// const cargarJsonLiquidaciones = () => {
//     // guarda el array de objetos 'Liquidacion' en localStorage
//     localStorage.setItem(lsLiquidaciones, JSON.stringify(jsonLiquidaciones.liquidaciones));
//     // arma la tabla de liquidaciones activas (read only)
//     armarTablaLiquidacionesIndex(jsonLiquidaciones.liquidaciones);
//  };

const urlJson = './data/liquidaciones.json';

// // --- metodo 2) JAVASCRIPT
// const cargarJsonLiquidaciones = () => {

//     let jsonData = localStorage.getItem(lsLiquidaciones);

//     // verifica si existe el json de liquidaciones en local storage
//     if (jsonData == null || jsonData == undefined) {   // si no existe lo carga del json externo

//         console.log('... cargando local storage de .json externo...');

//         fetch(urlJson)
//         .then(response => response.json())
//         .then(data => {
//             // guarda el array de objetos 'Liquidacion' en localStorage
//             localStorage.setItem(lsLiquidaciones, JSON.stringify(data.liquidaciones));
//             // arma la tabla de liquidaciones activas (read only)
//             cargarTablaLiquidacionesIndex(data.liquidaciones);
//         })
//         .catch(console.error);
//     } else {                                           // si existe lo parsea
//         // arma la tabla de liquidaciones activas (read only)
//         armarTablaLiquidacionesIndex(JSON.parse(jsonData));
//     };
// };

// --- metodo 3) JQUERY
const cargarJsonLiquidaciones = () => {

    let jsonData = localStorage.getItem(lsLiquidaciones);

    // verifica si existe el json de liquidaciones en local storage
    if (jsonData == null || jsonData === undefined) {   // si no existe lo carga del json externo

        console.log('... cargando local storage de .json externo...');

        $.get(urlJson, function(data, estado) {
            if (estado === "success") {
                // console.log(respuesta.liquidaciones);
                // guarda el array de objetos 'Liquidacion' en localStorage
                localStorage.setItem(lsLiquidaciones, JSON.stringify(data.liquidaciones));
                // arma la tabla de liquidaciones activas (read only)
                armarTablaLiquidacionesIndex(data.liquidaciones);
            }
        })
    } else {                                           // si existe lo parsea
        // arma la tabla de liquidaciones activas (read only)
        armarTablaLiquidacionesIndex(JSON.parse(jsonData));
    };
};


// carga tabla de liquidaciones read only desde array de liquidaciones
const armarTablaLiquidacionesIndex = (arrayObj) => {

    // console.log('cargarTablaLiquidacionesIndex');

    let tablaLiquidaciones = document.querySelector("#tablaLiquidacionesIndex");
    let tbody = document.createElement("tbody");
    tablaLiquidaciones.appendChild(tbody);

    for (let ii = 0; ii < arrayObj.length; ii++) {

        // console.log(arrayObj[ii]);

        if (arrayObj[ii].estado == 'abierta') {
            
            let tr = document.createElement("tr");
  
            let liquidacion = arrayObj[ii];
            for (let e in liquidacion) {
      
                if (liquidacion.hasOwnProperty(e)) {
                    
                    let td = document.createElement("td");
                    
                    if (e == 'id') {
                        td.innerHTML = `#${liquidacion[e]}`
                    } else {
                        td.innerHTML = liquidacion[e]
                    }
      
                    if (e == 'id' || e == 'descripcion' || e == 'periodo') {
                      td.classList.add("tm-liquidacion-bold");
                    };
                    
                    if (e == 'estado') {
                        // td.innerHTML = `#${liquidacion[e]}`
                        td.innerHTML = utiles.generateDivEstado(liquidacion[e]);
                    }
                    tr.appendChild(td);
                }
            }

            // agrega clase a la fila para usar a futuro
            tr.classList.add("tm-fila-liquidacion");
    
            tbody.appendChild(tr);
        }
    }

}

// carga las liquidaciones desde el .json y arma tabla de liquidaciones read only
window.onload=cargarJsonLiquidaciones();

