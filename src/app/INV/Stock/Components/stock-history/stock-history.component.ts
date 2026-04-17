import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { sharedImports } from '../../../../shared/Imports/shared-imports';
import { AppComponent } from '../../../../app.component';
import { StockSummary } from '../../Models/stock-summary';
import { StockSummaryService } from '../../Services/stock-summary.services';
import { Subject, takeUntil } from 'rxjs';
import { ApiResponse } from '../../../../shared/Models/response-model';

@Component({
  selector: 'stock-history',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.scss'],
})
export class StockHistoryComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  isVisible = false;
  stockHistory: StockSummary[] = [];
  private destroy = new Subject<void>();

  constructor(
    injector: Injector,
    private stockSummaryService: StockSummaryService,
  ) {
    super(injector);
  }
  ngOnInit(){

  }

  show(productId : number) {
    this.isVisible = true;

    this.stockSummaryService
      .getStockById(productId)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<StockSummary[]>) => {
          this.stockHistory = response.data;
        },
        error: (err) => {
          this.showMessage('Error', err.message, 'error');
        },
      });
  }

  close() {
    this.isVisible = false;
    this.stockHistory = [];
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
