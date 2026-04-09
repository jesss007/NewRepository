export class Product {
  id: number;
  name: string;
  description: string;
  pricePerUnit: number;
  status: number;
  quantity: number;
  productCode: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: number;
  updatedBy?: number;
  isDeleted?: number;
  deletedBy?: number;
  deletedAt?: Date;

  // Constructor with default values
  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.pricePerUnit = 0;
    this.status = 0;
    this.quantity = 0;
    this.productCode = '';
    this.createdAt = new Date();
    // optional fields can remain undefined
  }

  // Static example
  static defaultStatus = 1; // accessible via Product.defaultStatus
}

export interface ProductFilter {
  name? : string
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