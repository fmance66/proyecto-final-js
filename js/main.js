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
import { LiquidacionController } from './controllers/liquidacionController.js';
import { armarTablaHTML } from './liquidacion.js';

const iniciar = () => {
    const liquidaciones = new LiquidacionController();
    armarTablaHTML("#tablaLiquidacionesIndex", liquidaciones, true);
}

// arma tabla html dinamica (read only) desde las liquidaciones en localStorage
window.onload = iniciar();

  