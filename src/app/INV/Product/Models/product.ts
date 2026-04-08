export interface Product {
    id : number,
    name : string,
    description : string,
    pricePerUnit : number,
    status : number,
    quantity : number,
    productCode : string,
    createdAt : Date,
    updatedAt? : Date,
    createdBy? : number,
    updatedBy? : number,
    isDeleted? : number,
    deletedBy? : number,
    deletedAt? : Date
  
}

export interface ProductFilter {
  name : string
}

export interface ProductInsert{
    name : string,
    description : string,
    pricePerUnit : number,
    status : number,
    quantity : number,
    productCode : string,
    createdBy? : number,   
}

export interface ProductUpdate {
  id: number;
  pricePerUnit: number;
  status: number;
  quantity: number;
}

export interface ProductDelete {
  id: number;
  deletedBy : number
}