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
import arrayLiquidaciones from './data/liquidaciones.json' assert { type: "json" };

const lsLiquidaciones = "lsLiquidaciones";

// carga tabla de liquidaciones read only desde array de liquidaciones
const cargarTablaLiquidacionesRo = () => {

    // guarda el array de objetos 'Liquidacion' obtenido desde el JSON externo en localStorage
    localStorage.setItem(lsLiquidaciones, JSON.stringify(arrayLiquidaciones.liquidaciones));

    let tablaLiquidaciones = document.querySelector("#tablaLiquidacionesIndex");
    let tbody = document.createElement("tbody");
    tablaLiquidaciones.appendChild(tbody);

    for (let ii = 0; ii < arrayLiquidaciones.liquidaciones.length; ii++) {

        if (arrayLiquidaciones.liquidaciones[ii].estado == 'abierta') {
            
            let tr = document.createElement("tr");
  
            let liquidacion = arrayLiquidaciones.liquidaciones[ii];
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

// carga tabla de liquidaciones read only
window.onload=cargarTablaLiquidacionesRo();

