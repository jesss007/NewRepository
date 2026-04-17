export class Product {
  id: number;
  name: string;
  sku: string;
  productCode: string;
  category : string;
  status: number;
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
    this.sku = '',
    this.productCode = '';
    this.category = '';
    this.status = 0;
    this.createdAt = new Date();
    // optional fields can remain undefined
  }

  // Static example
  static defaultStatus = 1; // accessible via Product.defaultStatus
}

export interface ProductFilter {
  search? : string;
  status? : number | null;
}

export interface ProductInsert{
    name : string;
    sku : string;
    category : string;
    status : number;
    productCode : string;
    createdBy? : number;   
}

export interface ProductUpdate {
  id: number;
  name: string;
  sku: string;
  status: number;
  updatedBy: number;
}

export interface ProductDelete {
  id: number;
  deletedBy : number;
}

export interface ProductDropdown {
  id: number;
  name: string;
}