/* 
    Proyecto Final: Interprete de fórmulas tipo Excel
*/
  
class Recibo {

  constructor (recibo) {
    this.id = recibo.id;
    this.legajo = recibo.legajo;
    this.idLiquidacion = recibo.idLiquidacion;
    this.estado = recibo.estado;
    this.bruto = recibo.bruto;
    this.descuento = recibo.descuento;
    this.neto = recibo.neto;
  }
  
  mostrar() {
      return (
      `{ id: ${this.id}, legajo: ${this.legajo}, idLiquidacion: ${this.idLiquidacion},` + 
      ` estado: ${this.estado}, bruto: ${this.bruto}, descuento: ${this.descuento}, neto: ${this.neto} }`
      )
  }
}     // fin de class Recibo


export { Recibo };
