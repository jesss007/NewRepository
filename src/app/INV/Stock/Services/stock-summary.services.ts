import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/Models/response-model';
import { ProductOpeningBalance } from '../../Opening Balance/Models/opening-balance';
import { StockSummary, StockSummaryInsert } from '../../Stock/Models/stock-summary';

@Injectable({
  providedIn: 'root'
})

export class StockSummaryService{
    private getAllUrl = "https://localhost:7065/api/StockSummary/GetStockSummary"
    private insertUrl = "https://localhost:7065/api/StockSummary/CreateStockSummary"
    private getByIdUrl ="https://localhost:7065/api/StockSummary/GetStockById"

    constructor( private http : HttpClient){

    }

    getStockSummary():Observable<ApiResponse<StockSummary[]>>{
        return this.http.get<ApiResponse<StockSummary[]>>(this.getAllUrl);
    }

    insertStockSummary(data: StockSummaryInsert):Observable<ApiResponse<StockSummary>>{
        return this.http.post<ApiResponse<StockSummary>>(this.insertUrl, data);
    }

    getStockById(productId: number): Observable<ApiResponse<StockSummary[]>>{
        return this.http.get<ApiResponse<StockSummary[]>>
        (`${this.getByIdUrl}?productId=${productId}`);
    }

  

}
