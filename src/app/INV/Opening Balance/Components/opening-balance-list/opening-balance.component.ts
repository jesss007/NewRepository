import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from '../../../../app.component';
import { sharedImports } from '../../../../shared/Imports/shared-imports';
import {
  ProductOpeningBalance,
  ProductOpeningBalanceFilter,
} from '../../Models/opening-balance';
import { OpeningBalanceService } from '../../Services/product-opening-balance.service';
import { Subject, takeUntil } from 'rxjs';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../../shared/Models/response-model';
import { Router } from '@angular/router';
import { OpeningBalanceCreateComponent } from '../opening-balance-create/opening-balance-create.component';

@Component({
  selector: 'opening-balance',
  standalone: true,
  imports: [sharedImports, OpeningBalanceCreateComponent],
  templateUrl: './opening-balance.component.html',
  styleUrl: './opening-balance.component.scss',
})
export class OpeningBalanceComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  private destroy = new Subject<void>();
  openingBalance: ProductOpeningBalance[] = [];
  currentPage = 1;
  pageSize = 5;
  totalRows = 0;

  filter: ProductOpeningBalanceFilter = {
    search: undefined,
  };

  constructor(
    injector: Injector,
    private openingBalanceService: OpeningBalanceService,
    private router: Router,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadOpeningBalance();
  }

  get totalPages(): number {
    return Math.ceil(this.totalRows / this.pageSize);
  }

  get offset(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  loadOpeningBalance() {
    this.openingBalanceService
      .getPagedOpeningBalance(this.offset, this.pageSize, this.filter)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<MvGridConfig<ProductOpeningBalance>>) => {
          this.openingBalance = response.data.data ?? [];
          this.totalRows = response.data.totalRows;
        },
        error: (err) => {
          this.showMessage('Error', err.message, 'error');
        },
      });
  }

  onFilter() {
    this.currentPage = 1;
    this.loadOpeningBalance();
  }

  onClearFilter() {
    this.filter = { search: undefined };
    this.currentPage = 1;
    this.loadOpeningBalance();
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadOpeningBalance();
  }

  onSave(submitOpeningBalance: ProductOpeningBalance) {
    this.openingBalance.push(submitOpeningBalance);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
