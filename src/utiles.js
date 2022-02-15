/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/


// carga file JSON de datos 
import jsonLiquidaciones from '../data/liquidaciones.json' assert { type: "json" };
import jsonEmpleados from '../data/empleados.json' assert { type: "json" };
import jsonTipoVaribles from '../data/tipoVariables.json' assert { type: "json" };

let arrayLiquidaciones = jsonLiquidaciones.liquidaciones;
let arrayEmpleados = jsonEmpleados.empleados;
let arrayTipoVariables = jsonTipoVaribles.tipoVariables;


// ordena un array por el elemento 'nombre'
const ordenarVariables = (array) => {
  array.sort(function(a, b) {
      if (a.nombre > b.nombre) {
          return 1;
      } else if (a.nombre < b.nombre) {
          return -1;
      } else {
          return 0;
      }
  });

  return array;
}

// obtiene la liquidacion segun id
const getLiquidacion = (id) => {
        return arrayLiquidaciones.find(function(elemento, index) {
        if (elemento.id == id) {
            return true;
        }
    })
};

// obtiene un empleado según el legajo informado
const getEmpleado = (legajo) => {
        return arrayEmpleados.find(function(elemento, index) {
        if (elemento.legajo == legajo) {
            return true;
        }
    })
};

// obtiene un tipo de variable segun id
const getTipoVariable = (id) => {
        return arrayTipoVariables.find(function(elemento, index) {
            if (elemento.id == id) {
                return true;
            }
        })
};

  
const getListaTipoVariables = () => {
    return arrayTipoVariables;
};
  

// segun el estado devuelve la class con el color del semaforo verde, amarillo o rojo
const generateDivEstado = (estado) => { 

    let clase = '';

    switch (estado) {
        case 'abierta':
            clase = 'semaforo-verde';
            break;
        case 'activo':
            clase = 'semaforo-verde';
            break;
        case 'cerrada':
            clase = 'semaforo-rojo';
            break;
        case 'anulado':
            clase = 'semaforo-rojo';
            break;
        default:
            clase = 'indefinido';
            estado = 'semaforo-amarillo';
    }

    let texto = estado.charAt(0).toUpperCase() + estado.slice(1)
    return `<div class="tm-estado-semaforo ${clase}"></div>${texto}`;
    
};

export { ordenarVariables, generateDivEstado, getLiquidacion, getEmpleado, 
         getTipoVariable, getListaTipoVariables };
