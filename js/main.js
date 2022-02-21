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
import * as utiles   from './utiles.js';


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

// //------ animaciones descomentar si se quiere

// $(".tm-site-title").animate({
//     textTransform: 'lowercase',
//     fontSize: '0.1rem',
//     fontWeight: '100',
//     opacity: '0.5'
// });

// $(".navbar").hide();
// $("#table-container").fadeOut();
// $(".navbar").show("slow");
// $("#table-container").fadeIn(2000);
// // $(".tm-site-title").toggle();


// $(".tm-site-title").animate({
//     textTransform: 'uppercase',
//     fontSize: '1.3rem',
//     fontWeight: '700',
//     opacity: '1'
// }, 3000);

// //----- fin animaciones


// carga las liquidaciones desde el .json y arma tabla de liquidaciones read only
function start() {
    let arrayLiquidaciones = utiles.getListaLiquidaciones();
    armarTablaLiquidacionesIndex(arrayLiquidaciones);
};
  
 window.onload = start();
  
  