/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

let arrayLiquidaciones = [];
let arrayTipoLiquidaciones = [];
let arrayRecibos = [];
let arrayEmpleados = [];
let arrayVariables = [];
let arrayTipoVariables = [];


const lsLiquidaciones = "lsLiquidaciones";
const lsTipoLiquidaciones = "lsTipoLiquidaciones";
const lsRecibos = "lsRecibos";
const lsEmpleados = "lsEmpleados";
const lsVariables = "lsVariables";
const lsTipoVariables = "lsTipoVariables";

const urlJsonLiquidaciones = '../data/liquidaciones.json';
const urlJsonTipoLiquidaciones = '../data/tipoLiquidaciones.json';
const urlJsonRecibos = '../data/recibos.json';
const urlJsonEmpleados = '../data/empleados.json';
const urlJsonVariables = '../data/variables.json';
const urlJsonTipoVariables = '../data/tipoVariables.json';

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

cargarJsonLiquidaciones();
cargarJsonTipoLiquidaciones();
cargarJsonRecibos();
cargarJsonEmpleados();
cargarJsonVariables();
cargarJsonTipoVariables();
  
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
    // return arrayLiquidaciones.find(function(elemento, index) {
    //     if (elemento.id == id) {
    //         return true;
    //     }
    // })
    return arrayLiquidaciones.find(liquidacion => liquidacion.id == id);
};


// obtiene el tipo de liquidacion segun id
const getTipoLiquidacion = (id) => {
    // return arrayTipoLiquidaciones.find(function(elemento, index) {
    //     if (elemento.id == id) {
    //         return true;
    //     }
    // })
    return arrayTipoLiquidaciones.find(tipoLiquidacion => tipoLiquidacion.id == id);
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

// obtiene la lista de todos los tipos de variable
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

  
const getUltIdLiquidacion = () => {
    // console.log('getUltIdLiquidacion', arrayLiquidaciones);
    let ultId = Math.max.apply(Math, arrayLiquidaciones.map(liquidacion => liquidacion.id));
    // let ultId = arrayLiquidaciones.length;
    // console.log(ultId);
    return(ultId);
};

  
const agregarLiquidacion = (liquidacion) => {
    // console.log('agregarLiquidacion (antes)', arrayLiquidaciones);
    arrayLiquidaciones.push(liquidacion);
    // console.log('agregarLiquidacion (despues)', arrayLiquidaciones);
    guardarLiquidaciones();
};

  
const actualizarLiquidacion = (liquidacion) => {
    console.log('actualizarLiquidacion (antes)', arrayLiquidaciones);
    let obj = arrayLiquidaciones.find((elemento, index) => {
        if (elemento.id == liquidacion.id) {
            arrayLiquidaciones[index] = liquidacion;
            console.log('encontre --> ', liquidacion);
            return true;        // para de buscar
        }
    });
    console.log('actualizarLiquidacion (despues)', arrayLiquidaciones);
    guardarLiquidaciones();
};

export { ordenarVariables, generateDivEstado, getLiquidacion, getTipoLiquidacion, getEmpleado, 
         getTipoVariable, getListaLiquidaciones, getListaTipoLiquidaciones, getListaRecibos, 
         getListaEmpleados, getListaVariables, getListaTipoVariables, getUltIdLiquidacion, 
         agregarLiquidacion, actualizarLiquidacion
       };
