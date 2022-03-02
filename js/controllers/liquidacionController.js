/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as formula from '../formula.js';

import { Liquidacion } from '../models/liquidacion.js';
import { CategoriaController } from './categoriaController.js';
import { ConceptoController } from './conceptoController.js';
import { EmpleadoController } from './empleadoController.js';
import { TipoLiquidacionController } from './tipoLiquidacionController.js';

const urlJson = '../data/liquidaciones.json';
const lsName = "lsLiquidaciones";


class LiquidacionController {

  constructor () {

    // carga json de liquidaciones
      let jsonData = localStorage.getItem(lsName);
      // console.log(jsonData);
      let liquidaciones = [];

      // verifica si existe el json de liquidaciones en local storage
      if ((jsonData === undefined) || (jsonData == null)) {   // si no existe lo carga del json externo

          console.log('... cargando local storage de .json externo...');

          $.get(urlJson, function(data, estado) {
              if (estado === "success") {
                localStorage.setItem(lsName, JSON.stringify(data));
                // guarda en el array
                liquidaciones = data;
              }
          })
      } else {                                           // si existe lo parsea
          liquidaciones = JSON.parse(jsonData);
      };
      this.liquidaciones = liquidaciones.map(liquidacion => new Liquidacion(liquidacion));
    };

  // obtiene la liquidacion segun id
  get(id) {
    return this.liquidaciones.find(liquidacion => liquidacion.id == id);
  };

  // obtiene la lista de todas las liquidaciones
  getAll() {
    return this.liquidaciones;
  };
  
  getUltId() {
    return Math.max.apply(Math, this.liquidaciones.map(liquidacion => liquidacion.id));
  };

  guardar() {
    // console.log('liquidaciones.guardar', this.liquidaciones);
    localStorage.setItem(lsName, JSON.stringify(this.liquidaciones));
  };

  agregar(liquidacion) {
    console.log('liquidaciones.agregar (antes)', this.liquidaciones);
    this.liquidaciones.push(liquidacion);
    console.log('liquidaciones.agregar (despues)', this.liquidaciones);
    this.guardar();

    // obtiene el tipo de liquidacion para generar los conceptos de los recibos
    const tipoLiquidaciones = new TipoLiquidacionController();
    let tipoLiquidacion = tipoLiquidaciones.get(liquidacion.idTipoLiquidacion);
    console.log('tipoLiquidacion: ', tipoLiquidacion);

    // obtiene todos los empleados para generar los recibos
    const empleados = new EmpleadoController();

    // recorre la lista de empleados para generar un recibo por c/u
    empleados.getAll().forEach(function(empleado) {

        console.log('empleado: ', empleado);
  
        // obtiene los datos del empleado para calculos como sueldo bruto, antiguedad con la fecha de ingreso, etc
        const categorias = new CategoriaController();
        let categoria = categorias.get(empleado.idCategoria);
        empleados.cargarVariablesEmpleado(empleado.legajo);

        let conceptosRecibo = [];

        // calcula los conceptos del recibo desde el array de conceptos del tipo de liquidacion utilizando
        // el "simulador" de formulas
        tipoLiquidacion.conceptos.forEach(function(idConcepto) {
            console.log('idConcepto: ', idConcepto);
            const conceptos = new ConceptoController();
            let concepto = conceptos.get(idConcepto);
            console.log('concepto: ', concepto);
            let resultado = formula.calculoFormula(concepto.formula);
            conceptosRecibo.push({ id: concepto.id, 
                                   resultado: resultado.toFixed(2)
                                 });
        });
        // debería armar el recibo con esto!!!!!!!!!!!!!!!!!!!!!!!
        console.log('conceptosRecibo: ', conceptosRecibo)
    });
  };

  actualizar(liquidacion) {
    // console.log('liquidacion.actualizar (antes)', this.liquidaciones);
    let obj = this.liquidaciones.find((elemento, index) => {
        if (elemento.id == liquidacion.id) {
          this.liquidaciones[index] = liquidacion;
          // console.log('encontre --> ', liquidacion);
          return true;        // para de buscar
        }
    });
    // console.log('actualizarLiquidacion (despues)', this.liquidaciones);
    this.guardar();
  };

  eliminar(id) {
    // console.log('liquidacion.eliminar (antes)', id, this.liquidaciones);
    this.liquidaciones = this.liquidaciones.filter(liquidacion => liquidacion.id !== id);
    // console.log('liquidacion.eliminar (despues)', id, this.liquidaciones);
    this.guardar();
  };
}  

export { LiquidacionController };
