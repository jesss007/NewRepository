import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, MvGridConfig } from '../../../shared/Models/response-model';
import { Product, ProductDelete, ProductFilter, ProductInsert, ProductUpdate } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private getAllUrl = "https://localhost:7065/api/Product/GetAllProduct"
  private insertUrl = "https://localhost:7065/api/Product/CreateProduct"
  private updateUrl = "https://localhost:7065/api/Product/UpdateProduct"
  private deleteUrl = "https://localhost:7065/api/Product/DeleteProduct"
  private getPagedUrl = "https://localhost:7065/api/Product/GetProduct"

  constructor(private http : HttpClient) {

   }

   getProduct():Observable<ApiResponse<Product[]>>{
    return this.http.get<ApiResponse<Product[]>>(this.getAllUrl);
   }

   insertProduct(data : ProductInsert):Observable<ApiResponse<Product>>{
    return this.http.post<ApiResponse<Product>>(this.insertUrl, data);
   }

   updateProduct (data : ProductUpdate) : Observable<ApiResponse<Product>>{
    return this.http.put<ApiResponse<Product>>(this.updateUrl,data);
   }

   deleteProduct (data : ProductDelete) : Observable<ApiResponse<Product>>{
    return this.http.delete<ApiResponse<Product>>(`${this.deleteUrl}?Id=${data.id}&DeletedBy=${data.deletedBy}`);
   }

   getProductPaged(offset: number, pageSize: number, filter?: ProductFilter): Observable<ApiResponse<MvGridConfig<Product>>>{
    return this.http.get<ApiResponse<MvGridConfig<Product>>>(`${this.getPagedUrl}?Offset=${offset}&PageSize=${pageSize}&Filter.Name=${filter?.name ?? ''}`);
   }

}
