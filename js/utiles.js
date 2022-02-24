/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as formula from './formula.js';

let arrayLiquidaciones = [];
let arrayTipoLiquidaciones = [];
let arrayRecibos = [];
let arrayEmpleados = [];
let arrayVariables = [];
let arrayTipoVariables = [];
let arrayCategorias = [];
let arrayConceptos = [];

const lsLiquidaciones = "lsLiquidaciones";
const lsTipoLiquidaciones = "lsTipoLiquidaciones";
const lsRecibos = "lsRecibos";
const lsEmpleados = "lsEmpleados";
const lsVariables = "lsVariables";
const lsTipoVariables = "lsTipoVariables";
const lsCategorias = "lsCategorias";
const lsConceptos = "lsConceptos";

const urlJsonLiquidaciones = '../data/liquidaciones.json';
const urlJsonTipoLiquidaciones = '../data/tipoLiquidaciones.json';
const urlJsonRecibos = '../data/recibos.json';
const urlJsonEmpleados = '../data/empleados.json';
const urlJsonVariables = '../data/variables.json';
const urlJsonTipoVariables = '../data/tipoVariables.json';
const urlJsonCategorias = '../data/categorias.json';
const urlJsonConceptos = '../data/conceptos.json';

// carga json de liquidaciones
const cargarJsonLiquidaciones = () => {

  let jsonData = localStorage.getItem(lsLiquidaciones);
  // console.log(jsonData);

  // verifica si existe el json de liquidaciones en local storage
  if (jsonData == null || jsonData === undefined) {   // si no existe lo carga del json externo

      console.log('... cargando local storage de .json externo...');

      $.get(urlJsonLiquidaciones, function(data, estado) {
          if (estado === "success") {
            // console.log(respuesta.liquidaciones);
            // guarda el array de objetos 'Liquidacion' en localStorage
            localStorage.setItem(lsLiquidaciones, JSON.stringify(data.liquidaciones));
            // guarda en el array
            arrayLiquidaciones = data.liquidaciones;
          }
      })
  } else {                                           // si existe lo parsea
        // console.log('cargando de local storage...', JSON.parse(jsonData));
        // guarda en el array
        arrayLiquidaciones = JSON.parse(jsonData);
  };
};


// carga json de tipos de liquidacion
const cargarJsonTipoLiquidaciones = () => {

    let jsonData = localStorage.getItem(lsTipoLiquidaciones);
    // console.log(jsonData);
  
    // verifica si existe el json de tipos de liquidación en local storage
    if (jsonData == null || jsonData === undefined) {   // si no existe lo carga del json externo
  
        console.log('... cargando local storage de .json externo...');
  
        $.get(urlJsonTipoLiquidaciones, function(data, estado) {
            if (estado === "success") {
                // console.log(respuesta.tipoLiquidaciones);
                // guarda el array de objetos 'TipoLiquidacion' en localStorage
                localStorage.setItem(lsTipoLiquidaciones, JSON.stringify(data.tipoLiquidaciones));
                // guarda en el array
                arrayTipoLiquidaciones = data.tipoliquidaciones;
            }
        })
    } else {                                           // si existe lo parsea
        // console.log('cargando de local storage...', JSON.parse(jsonData));
        // guarda en el array
        arrayTipoLiquidaciones = JSON.parse(jsonData);
    };
  };


// carga json de recibos
const cargarJsonRecibos = () => {

    let jsonData = localStorage.getItem(lsRecibos);
    // console.log(jsonData);
  
    // verifica si existe el json de recibos en local storage
    if (jsonData == null || jsonData === undefined) {   // si no existe lo carga del json externo
  
        console.log('... cargando local storage de .json externo...');
  
        $.get(urlJsonRecibos, function(data, estado) {
            if (estado === "success") {
                // console.log(respuesta.recibos);
                // guarda el array de objetos 'Recibo' en localStorage
                localStorage.setItem(lsRecibos, JSON.stringify(data.recibos));
                // guarda en el array
                arrayRecibos = data.recibos;
            }
        })
    } else {                                           // si existe lo parsea
        // console.log('cargando de local storage...', JSON.parse(jsonData));
        // guarda en el array
        arrayRecibos = JSON.parse(jsonData);
    };
  };


// carga json de empleados
const cargarJsonEmpleados = () => {

    let jsonData = localStorage.getItem(lsEmpleados);
    // console.log(jsonData);
  
    // verifica si existe el json de empleados en local storage
    if (jsonData == null || jsonData === undefined) {   // si no existe lo carga del json externo
  
        console.log('... cargando local storage de .json externo...');
  
        $.get(urlJsonEmpleados, function(data, estado) {
            if (estado === "success") {
                // console.log(respuesta.empleados);
                // guarda el array de objetos 'Empleado' en localStorage
                localStorage.setItem(lsEmpleados, JSON.stringify(data.empleados));
                // guarda en el array
                arrayEmpleados = data.empleados;
            }
        })
    } else {                                           // si existe lo parsea
        // console.log('cargando de local storage...', JSON.parse(jsonData));
        // guarda en el array
        arrayEmpleados = JSON.parse(jsonData);
    };
  };


// carga json de variables
const cargarJsonVariables = () => {

    let jsonData = localStorage.getItem(lsVariables);
    // console.log(jsonData);
  
    // verifica si existe el json de variables en local storage
    if (jsonData == null || jsonData === undefined) {   // si no existe lo carga del json externo
  
        console.log('... cargando local storage de .json externo...');
  
        $.get(urlJsonVariables, function(data, estado) {
            if (estado === "success") {
                // console.log(respuesta.variables);
                // guarda el array de objetos 'Variable' en localStorage
                localStorage.setItem(lsVariables, JSON.stringify(data.variables));
                // guarda en el array
                arrayVariables = data.variables;
            }
        })
    } else {                                           // si existe lo parsea
        // console.log('cargando de local storage...', JSON.parse(jsonData));
        // guarda en el array
        arrayVariables = JSON.parse(jsonData);
    };
  };


// carga json de tipos de variable
const cargarJsonTipoVariables = () => {

    let jsonData = localStorage.getItem(lsTipoVariables);
    // console.log(jsonData);
  
    // verifica si existe el json de tipos de variable en local storage
    if (jsonData == null || jsonData === undefined) {   // si no existe lo carga del json externo
  
        console.log('... cargando local storage de .json externo...');
  
        $.get(urlJsonTipoVariables, function(data, estado) {
            if (estado === "success") {
                // console.log(respuesta.tipoVariables);
                // guarda el array de objetos 'TipoVariable' en localStorage
                localStorage.setItem(lsTipoVariables, JSON.stringify(data.tipoVariables));
                // guarda en el array
                arrayTipoVariables = data.tipoVariables;
            }
        })
    } else {                                           // si existe lo parsea
        // console.log('cargando de local storage...', JSON.parse(jsonData));
        // guarda en el array
        arrayTipoVariables = JSON.parse(jsonData);
    };
  };


// carga json de categorias de categorias
const cargarJsonCategorias = () => {

    let jsonData = localStorage.getItem(lsCategorias);
    // console.log(jsonData);
  
    // verifica si existe el json de categorias en local storage
    if (jsonData == null || jsonData === undefined) {   // si no existe lo carga del json externo
  
        console.log('... cargando local storage de .json externo...');
  
        $.get(urlJsonCategorias, function(data, estado) {
            if (estado === "success") {
                // console.log(respuesta.categorias);
                // guarda el array de objetos 'Categoria' en localStorage
                localStorage.setItem(lsCategorias, JSON.stringify(data.categorias));
                // guarda en el array
                arrayCategorias = data.categorias;
            }
        })
    } else {                                           // si existe lo parsea
        // console.log('cargando de local storage...', JSON.parse(jsonData));
        // guarda en el array
        arrayCategorias = JSON.parse(jsonData);
    };
  };


// carga json de conceptos de liquidación
const cargarJsonConceptos = () => {

    let jsonData = localStorage.getItem(lsConceptos);
    // console.log(jsonData);
  
    // verifica si existe el json de conceptos en local storage
    if (jsonData == null || jsonData === undefined) {   // si no existe lo carga del json externo
  
        console.log('... cargando local storage de .json externo...');
  
        $.get(urlJsonConceptos, function(data, estado) {
            if (estado === "success") {
                // console.log(respuesta.conceptos);
                // guarda el array de objetos 'Concepto' en localStorage
                localStorage.setItem(lsConceptos, JSON.stringify(data.conceptos));
                // guarda en el array
                arrayConceptos = data.conceptos;
            }
        })
    } else {                                           // si existe lo parsea
        // console.log('cargando de local storage...', JSON.parse(jsonData));
        // guarda en el array
        arrayConceptos = JSON.parse(jsonData);
    };
  };

cargarJsonLiquidaciones();
cargarJsonTipoLiquidaciones();
cargarJsonRecibos();
cargarJsonEmpleados();
cargarJsonVariables();
cargarJsonTipoVariables();
cargarJsonCategorias();
cargarJsonConceptos();
  
const guardarLiquidaciones = () => {
    // console.log('guardarLiquidaciones', arrayLiquidaciones);
    localStorage.setItem('lsLiquidaciones', JSON.stringify(arrayLiquidaciones));
};

const guardarRecibos = () => {
    localStorage.setItem('lsRecibos', JSON.stringify(arrayRecibos));
};

const guardarVariables = () => {
    localStorage.setItem('lsVariables', JSON.stringify(arrayVariables));
};

// obtiene la liquidacion segun id
const getLiquidacion = (id) => {
    return arrayLiquidaciones.find(liquidacion => liquidacion.id == id);
};

// obtiene el tipo de liquidacion segun id
const getTipoLiquidacion = (id) => {
    return arrayTipoLiquidaciones.find(tipoLiquidacion => tipoLiquidacion.id == id);
};

// obtiene un empleado según el legajo informado
const getEmpleado = (legajo) => {
    return arrayEmpleados.find(empleado => empleado.legajo == legajo);
};

// obtiene una variable por su nombre
const getVariable = (nombre) => {
    return arrayVariables.find(variable => variable.nombre == nombre);
};

// obtiene un tipo de variable segun id
const getTipoVariable = (id) => {
    return arrayTipoVariables.find(tipoVariable => tipoVariable.id == id);
};

// obtiene una categoria segun id
const getCategoria = (id) => {
    return arrayCategorias.find(categoria => categoria.id == id);
};

// obtiene una concepto segun id
const getConcepto = (id) => {
    return arrayConceptos.find(concepto => concepto.id == id);
};

// obtiene la lista de todas las liquidaciones
const getListaLiquidaciones = () => {
    return arrayLiquidaciones;
};

// obtiene la lista de todas los tipos de liquidaciones
const getListaTipoLiquidaciones = () => {
    return arrayTipoLiquidaciones;
};

// obtiene la lista de todos los recibos
const getListaRecibos = (idLiquidacion) => {
    let arrayRecibosFilter = arrayRecibos.filter(recibo => recibo.idLiquidacion == idLiquidacion);
    // console.log(idLiquidacion, arrayRecibosFilter);
    return arrayRecibosFilter;
};

// obtiene la lista de todos los empleados
const getListaEmpleados = () => {
    return arrayEmpleados;
};

// obtiene la lista de todos las variables
const getListaVariables = () => {
    return arrayVariables;
};

// obtiene la lista de todas las variables internas (idTipoVariable = 6)
const getListaVariablesInternas = () => {
    return arrayVariables.filter(variable => variable.idTipoVariable == 6);
};

// obtiene la lista de todos los tipos de variable
const getListaTipoVariables = () => {
    return arrayTipoVariables;
};

// obtiene la lista de todas las categorias de empleados
const getListaCategorias = () => {
    return arrayCategorias;
};  

// obtiene la lista de todos los conceptos de liquidacion
const getListaConceptos = () => {
    return arrayConceptos;
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
  
const getUltIdLiquidacion = () => {
    // console.log('getUltIdLiquidacion', arrayLiquidaciones);
    let ultId = Math.max.apply(Math, arrayLiquidaciones.map(liquidacion => liquidacion.id));
    // let ultId = arrayLiquidaciones.length;
    // console.log(ultId);
    return(ultId);
};
  
const getUltIdRecibo = () => {
    // console.log('getUltIdRecibo', arrayRecibos);
    let ultId = Math.max.apply(Math, arrayRecibos.map(recibo => recibo.id));
    // let ultId = arrayRecibos.length;
    // console.log(ultId);
    return(ultId);
};
  
const getUltIdVariable = () => {
    // console.log('getUltIdVariable', arrayVariables);
    let ultId = Math.max.apply(Math, arrayVariables.map(variable => variable.id));
    // let ultId = arrayVariables.length;
    // console.log(ultId);
    return(ultId);
};

const cargarVariablesEmpleado = (legajo) => {

    // obtiene los datos del empleado para asignar a las variables internas
    let empleado = getEmpleado(legajo);
    console.log('empleado: ', empleado);
      
    // obtiene el sueldo bruto del empleado de la categoría
    let categoria = getCategoria(empleado.idCategoria);
    console.log('categoria: ', categoria);

    // obtine todas las variables de tipo internas (idTipoVariable = 6)
    let variablesInternas = getListaVariablesInternas();
    console.log('variablesInternas: ', variablesInternas);
    
    // recorre las variables internas para asignar los datos del empleado
    variablesInternas.forEach(function(variable) {
        console.log('variable: ', variable);

        switch (variable.nombre) {
            case '#SUELDO_BRUTO':
                variable.valor = categoria.sueldoBruto;
                break;
            case '#FECHA_INGRESO':
                variable.valor = variable.id, empleado.fechaIngreso;
                break;
            case '#NOMBRE_OBRA_SOCIAL':
                variable.valor = variable.id, empleado.obraSocial;
                break;
            default: 
                null;     // ver que hacer!!!
                break;
        }

        // actualiza la variable en el array global y json
        actualizarVariable(variable);
    });
};

const agregarLiquidacion = (liquidacion) => {
    // console.log('agregarLiquidacion (antes)', arrayLiquidaciones);
    arrayLiquidaciones.push(liquidacion);
    // console.log('agregarLiquidacion (despues)', arrayLiquidaciones);
    guardarLiquidaciones();

    // obtiene el tipo de liquidacion para generar los conceptos de los recibos
    let tipoLiquidacion = getTipoLiquidacion(liquidacion.idTipoLiquidacion);
    console.log('tipoLiquidacion: ', tipoLiquidacion);

    // obtiene todos los empleados para generar los recibos
    let arrayEmpleados = getListaEmpleados();

    // recorre la lista de empleados para generar un recibo por c/u
    arrayEmpleados.forEach(function(empleado) {
        console.log('empleado: ', empleado);
        // obtiene los datos del empleado para calculos como sueldo bruto, antiguedad con la fecha de ingreso, etc
        let categoria = getCategoria(empleado.idCategoria);

        // carga las variables del empleado
        cargarVariablesEmpleado(empleado.legajo);

        let conceptosRecibo = [];

        // calcula los conceptos del recibo desde el array de conceptos del tipo de liquidacion utilizando
        // el "simulador" de formulas
        tipoLiquidacion.conceptos.forEach(function(idConcepto) {
            console.log('idConcepto: ', idConcepto);
            let concepto = getConcepto(idConcepto);
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

const agregarVariable = (variable) => {
    // console.log('agregarVariable (antes)', arrayVariables);
    arrayLiquidaciones.push(liquidacion);
    // console.log('agregarVariable (despues)', arrayVariables);
    guardarVariables();
};

const actualizarLiquidacion = (liquidacion) => {
    // console.log('actualizarLiquidacion (antes)', arrayLiquidaciones);
    let obj = arrayLiquidaciones.find((elemento, index) => {
        if (elemento.id == liquidacion.id) {
            arrayLiquidaciones[index] = liquidacion;
            // console.log('encontre --> ', liquidacion);
            return true;        // para de buscar
        }
    });
    // console.log('actualizarLiquidacion (despues)', arrayLiquidaciones);
    guardarLiquidaciones();
};

const actualizarVariable = (variable) => {
    // console.log('actualizarVariable (antes)', arrayVariables);
    let obj = arrayVariables.find((elemento, index) => {
        if (elemento.id == variable.id) {
            arrayVariables[index] = variable;
            // console.log('encontre --> ', variable);
            return true;        // para de buscar
        }
    });
    // console.log('actualizarVariable (despues)', arrayVariables);
    guardarVariables();
};

const eliminarLiquidacion = (id) => {
    // console.log('eliminarLiquidacion (antes)', id, arrayLiquidaciones);
    arrayLiquidaciones = arrayLiquidaciones.filter(liquidacion => liquidacion.id !== id);
    // console.log('eliminarLiquidacion (despues)', id, arrayLiquidaciones);
    guardarLiquidaciones();
};

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
  
export { ordenarVariables, generateDivEstado, getLiquidacion, getTipoLiquidacion, getEmpleado, getVariable,
         getTipoVariable, getListaLiquidaciones, getListaTipoLiquidaciones, getListaRecibos, 
         getListaEmpleados, getListaVariables, getListaVariablesInternas, getListaTipoVariables, 
         getUltIdLiquidacion, getUltIdRecibo, getUltIdVariable, 
         agregarLiquidacion, agregarVariable, actualizarLiquidacion, eliminarLiquidacion
       };
