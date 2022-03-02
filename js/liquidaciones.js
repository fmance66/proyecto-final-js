/* Proyecto Final: Interprete de fórmulas tipo Excel

*/

// librerias
import { LiquidacionController } from './controllers/liquidacionController.js';
import { armarTablaHTML } from './liquidacion.js';


const iniciar = () => {
    const liquidaciones = new LiquidacionController();
    armarTablaHTML("#tablaLiquidaciones", liquidaciones, false);
}

// arma tabla html dinamica (read only) desde las liquidaciones en localStorage
window.onload = iniciar();

  