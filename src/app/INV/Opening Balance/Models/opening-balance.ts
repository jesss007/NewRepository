export interface ProductOpeningBalance {
    id: number;
    productId : number;
    productName: string;
    productCode : string;
    sku: string;
    quantity : number;
    date? : Date;
    createdBy? : number;
}

export interface ProductOpeningBalanceFilter{
    search? : string;
}

export class ProductOpeningBalanceInsert {
    productId : number;
    quantity : number;
    sku: string;
    createdBy? : number;

    constructor() {
        this.productId = 0,
        this.quantity = 0;
        this.sku ='';
        this.createdBy = 1;
    }
}
