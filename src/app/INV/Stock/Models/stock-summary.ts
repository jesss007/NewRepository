export interface StockSummary
{
    id : number,
    productId : number,
    productName : string,
    productCode : string,
    sku? : string,
    stockType? : string,
    quantity : number,
    balanceQuantity : number,
    remarks? : string,
    createdAt : Date,
    createdBy : number
}

export class StockSummaryInsert{
    productId : number;
    sku? : string;
    stockType? : string;
    quantity: number;
    remarks : string;
    createdBy? : number; 

    constructor(){
        this.productId = 0,
        this.sku = '',
        this.stockType = '',
        this.quantity = 0,
        this.remarks = '',
        this.createdBy = 1

    }
}