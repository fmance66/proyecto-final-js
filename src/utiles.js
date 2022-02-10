/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

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

// busca la liquidacion por id en el array de liquidaciones
const getLiquidacion = (arrayLiquidaciones, id) => {
    return arrayLiquidaciones.find(function(elemento, index) {
        if (elemento.id == id) {
            return true;
        }
    })
};

// busca un empleado por legajo en el array de empleados
const getEmpleado = (arrayEmpleados, legajo) => {
    return arrayEmpleados.find(function(elemento, index) {
        if (elemento.legajo == legajo) {
            return true;
        }
    })
};

// busca un tipo de variable en el array de tipos de variables
const getTipoVariable = (arrayTipoVariables, id) => {
    return arrayTipoVariables.find(function(elemento, index) {
        if (elemento.id == id) {
            return true;
        }
    })
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

export { ordenarVariables, generateDivEstado, getLiquidacion, getEmpleado, getTipoVariable };
