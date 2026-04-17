import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { StockSummary } from '../../Models/stock-summary';
import { StockSummaryService } from '../../Services/stock-summary.services';
import { Subject, takeUntil } from 'rxjs';
import { ApiResponse } from '../../../../shared/Models/response-model';
import { AppComponent } from '../../../../app.component';
import { sharedImports } from '../../../../shared/Imports/shared-imports';
import { Router } from '@angular/router';
import { StockSummaryCreateComponent } from '../stock-summary-create/stock-summary-create.component';
import { StockHistoryComponent } from '../stock-history/stock-history.component';

@Component({
  selector: 'stock-summary',
  standalone: true,
  imports: [sharedImports, StockSummaryCreateComponent, StockHistoryComponent],
  templateUrl: './stock-summary.component.html',
  styleUrl: './stock-summary.component.scss',
})
export class StockSummaryComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  stockSummary: StockSummary[] = [];
  private destroy = new Subject<void>();

  constructor(
    injector: Injector,
    private stockSummaryService: StockSummaryService,
    private router: Router,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadStockSummary();
  }

  loadStockSummary() {
    this.stockSummaryService
      .getStockSummary()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<StockSummary[]>) => {
          this.stockSummary = response.data;
        },
        error: (err) => {
          this.showMessage('Error', err.message, 'error');
        },
      });
  }

  onSave(submitStockSummary: StockSummary) {
    const index = this.stockSummary.findIndex(
      (s) => s.productId === submitStockSummary.productId,
    );

    if (index !== -1) {
      this.stockSummary[index] = submitStockSummary;
    } else {
      this.stockSummary.push(submitStockSummary);
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
