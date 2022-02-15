/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/

// import * as utiles from './utiles.js';


// carga los datos de la liquidacion desde sessionStorage
const cargarDatosLiquidacion = () => {

  // obtiene los datos de la liquidacion desde el sessionStorage
  // let liquidacion = JSON.parse(sessionStorage.getItem("objLiquidacion"));
  // console.log(liquidacion);

  // asigna valores desde el objeto liquidacion
  document.querySelector("#periodo").value = "";           //liquidacion.periodo;
  document.querySelector("#descripcion").value = "";       //liquidacion.descripcion;
  // document.querySelector("#fechaPago").value = liquidacion.fechaPago;

}

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
        // $(this).datepicker('setDate', new Date(anio, mes, 1)).trigger('change');
        $(this).datepicker('setDate', new Date(anio, mes, 1));
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

// carga los datos de la liquidación desde la sessionStorage
window.onload=cargarDatosLiquidacion();


// export { xxxxx, yyyyy };
