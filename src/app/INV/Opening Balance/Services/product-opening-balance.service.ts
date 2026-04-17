import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../shared/Models/response-model';
import {
  ProductOpeningBalance,
  ProductOpeningBalanceFilter,
  ProductOpeningBalanceInsert,
} from '../../Opening Balance/Models/opening-balance';

@Injectable({
  providedIn: 'root',
})
export class OpeningBalanceService {
  
  private insertUrl =
    'https://localhost:7065/api/ProductOpeningBalance/CreateOpeningBalance';
  private getPagedUrl =
    'https://localhost:7065/api/ProductOpeningBalance/GetAllOpeningBalance';

  constructor(private http: HttpClient) {}

  insertOpeningBalance(
    data: ProductOpeningBalanceInsert,
  ): Observable<ApiResponse<ProductOpeningBalance>> {
    return this.http.post<ApiResponse<ProductOpeningBalance>>(
      this.insertUrl,
      data,
    );
  }

  getPagedOpeningBalance(
    offset: number,
    pageSize: number,
    filter?: ProductOpeningBalanceFilter,
  ): Observable<ApiResponse<MvGridConfig<ProductOpeningBalance>>> {
    return this.http.get<ApiResponse<MvGridConfig<ProductOpeningBalance>>>(
      `${this.getPagedUrl}?Offset=${offset}&PageSize=${pageSize}` +
        `&Filter.Search=${filter?.search ?? ''}`,
    );
  }
}
