/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

import * as utiles from './utiles.js';
  
function Liquidacion(id, periodo, descripcion, idTipoLiquidacion, estado, fechaPago) {
  this.id = id;
  this.periodo = periodo;
  this.descripcion = descripcion;
  this.idTipoLiquidacion = idTipoLiquidacion;
  this.estado = estado;
  this.fechaPago  = fechaPago;
  this.mostrar = function() {
    return (
      `{ id: ${this.id}, periodo: ${this.periodo}, descripcion: ${this.descripcion},` + 
      ` idTipoLiquidacion: ${this.idTipoLiquidacion}, estado: ${this.estado}, fechaPago: ${this.fechaPago} }`
      )
  }
};

const cargarSelectTipoLiquidacion = () => {

  let tipoLiquidacionSelect = document.querySelector('#selTipoLiquidacion');
  let arrayTipoLiquidaciones = utiles.getListaTipoLiquidaciones();

  arrayTipoLiquidaciones.forEach(function(tipoLiquidacion) {
    let opcion = document.createElement('option');
    opcion.value = tipoLiquidacion.id;
    opcion.text = tipoLiquidacion.descripcion;
    tipoLiquidacionSelect.add(opcion);
  });

  // propone el primer tipo de liquidacion como default
  tipoLiquidacionSelect.value = arrayTipoLiquidaciones[0].id;

};

// carga los datos de la liquidacion desde sessionStorage
const cargarDatosLiquidacion = () => {

  // carga el select de tipo de liquidaciones desde el json
  cargarSelectTipoLiquidacion();

  // busca el tipo de liquidacion segun el idTipoLiquidacion
  let tipoLiquidacionSelect = document.querySelector('#selTipoLiquidacion');
  // console.log(tipoLiquidacionSelect.value);
  let tipoLiquidacion = utiles.getTipoLiquidacion(tipoLiquidacionSelect.value);
  
  // console.log(tipoLiquidacion);

  // asigna valores por defecto
  document.querySelector("#id").value = 0;
  document.querySelector("#selTipoLiquidacion").value = tipoLiquidacion.id;
  document.querySelector("#periodo").value = "";
  document.querySelector("#descripcion").value = "";
  document.querySelector("#fechaPago").value = "";
  document.querySelector("#estado").value = "abierta";
};

window.onload=cargarDatosLiquidacion();

$(function() {
  $('.periodpicker').datepicker({
      dateFormat: "mm/yy",
      changeMonth: true,
      changeYear: true,
      showButtonPanel: true,

      onClose: function(dateText, inst) {

        function isDonePressed(){
          return ($('#ui-datepicker-div').html().indexOf('ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all ui-state-hover') > -1);
        }

        if (isDonePressed()){
          let mes = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
          let anio = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
          $(this).datepicker('setDate', new Date(anio, mes, 1)).trigger('change');
          
          $('.periodpicker').focusout()  //Added to remove focus from datepicker input box on selecting date
        }
      },
      beforeShow : function(input, inst) {

          inst.dpDiv.addClass('month_year_datepicker');
          $(input).datepicker("widget").addClass('hide-month hide-current hide-calendar');

          let datestr = $(this).val();

          if (datestr.length > 0) {
              let anio = datestr.substring(datestr.length - 4, datestr.length);
              let mes = datestr.substring(0, 2);
              $(this).datepicker('option', 'defaultDate', new Date(anio, mes - 1, 1));
              $(this).datepicker('setDate', new Date(anio, mes - 1, 1));
              $(".ui-datepicker-calendar").hide();
          }
      },
      onClose: function(dateText, inst) {
        let mes = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
        let anio = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
        $(this).datepicker('setDate', new Date(anio, mes, 1)).trigger('change');
        // $(this).datepicker('setDate', new Date(anio, mes, 1));
        $(this).datepicker('widget').removeClass('hide-month hide-current hide-calendar');
      }        
  })
});

// datepicker para fechas (jquery)
$(function() {
  $(".ui-datepicker-calendar").show();
  $(".datepicker").datepicker({
    dateFormat: 'dd/mm/yy',
    gotoCurrent: true
  });
});

$(function() {
  $("#btnAgregar").click(function() {
    // console.log('hizo click en agregar!!!');

    const liquidacion = new Liquidacion(); 
    liquidacion.id = utiles.getUltIdLiquidacion() + 1;
    liquidacion.periodo = document.querySelector("#periodo").value;
    liquidacion.fechaPago = document.querySelector("#fechaPago").value;
    liquidacion.descripcion = document.querySelector("#descripcion").value;
    liquidacion.idTipoLiquidacion = parseInt(document.querySelector("#selTipoLiquidacion").value);
    liquidacion.estado = "abierta";
    // console.log(liquidacion);

    // agrega la liquidacion en el array global y el localStorage
    utiles.agregarLiquidacion(liquidacion);

    // mensaje de exito
    toastr.success('El registro fue agregado con éxito...','Alta liquidación');


    // limpia el formulario
    cargarDatosLiquidacion();

  });
});

