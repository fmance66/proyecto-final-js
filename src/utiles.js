/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

// ordena un array por el elemento 'nombre'
const OrdenarVariables = (array) => {
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

// guarda la clave/valor en localStorage
const SetEnLocalStorage = (clave, valor) => { 
    localStorage.setItem(clave, valor) 
};

// devuelve el estado --> por ahora es algo teórico...
const GenerateDivEstado = (valor) => { 

    // como viene un numero en formato e.eee.eee,dd le saca los puntos y reemplaza la coma por punto
    const formatear = (x) => {
        return x.replaceAll('.', '').replaceAll(',', '.')
    };

    // como viene un numero en formato e.eee.eee,dd le saca los puntos y reemplaza la coma por punto
    valor = formatear(valor);

    let digito = Math.trunc(Number(valor))%10;
    let clase = '';
    let texto = '';

    switch (digito) {
        case 0:
        case 1:
        case 2:
        case 3:
            clase = 'finalizado';
            texto = 'Pagado';
            break;
        case 4:
        case 5:
        case 6:
            clase = 'pendiente';
            texto = 'Pendiente';
            break;
        case 7:
        case 8:
        case 9:
            clase = 'cancelado';
            texto = 'Cancelado';
            break;
        default:
            clase = 'finalizado';
            texto = 'Pagado';
    }
    return `<div class="tm-estado-circle ${clase}"></div>${texto}`;
};

export { OrdenarVariables, SetEnLocalStorage, GenerateDivEstado };
