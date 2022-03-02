/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import { Recibo } from '../models/recibo.js';

const urlJson = '../data/recibos.json';
const lsName = "lsRecibos";

class ReciboController {

  constructor() {

    // carga json de recibos
    let jsonData = localStorage.getItem(lsName);
    // console.log(jsonData);
    let recibos = [];

    // verifica si existe el json de recibos en local storage
    if ((jsonData === undefined) || (jsonData == null)) {   // si no existe lo carga del json externo

        console.log('... cargando local storage de .json externo...');

        $.get(urlJson, function(data, estado) {
            if (estado === "success") {
                // console.log(respuesta.recibos);
                // guarda el array de objetos 'Recibo' en localStorage
                localStorage.setItem(lsName, JSON.stringify(data));
                // guarda en el array
                recibos = data;
            }
        })
    } else {                                           // si existe lo parsea
        // console.log('cargando de local storage...', JSON.parse(jsonData));
        // guarda en el array
        recibos = JSON.parse(jsonData);
    };
    this.recibos = recibos.map(recibo => new Recibo(recibo));
  }

  // obtiene la lista de todos los recibos
  getAll() {
    return this.recibos;
  };

  // obtiene la lista de todos los recibos de una liquidacion
  getAll(idLiquidacion) {
    return this.recibos.filter(recibo => recibo.idLiquidacion == idLiquidacion);
  };
  
  getUltId() {
    return Math.max.apply(Math, this.recibos.map(recibo => recibo.id));
  };

  guardar() {
    localStorage.setItem(lsName, JSON.stringify(this.recibos));
  };

}   

export { ReciboController };
