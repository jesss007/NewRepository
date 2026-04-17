import {
  Component,
  EventEmitter,
  Injector,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AppComponent } from '../../../../app.component';
import { Subject, takeUntil } from 'rxjs';
import { StockSummaryInsert, StockSummary } from '../../Models/stock-summary';
import { StockSummaryService } from '../../Services/stock-summary.services';
import { ProductService } from '../../../Product/Services/product.service';
import { Product, ProductDropdown } from '../../../Product/Models/product';
import { ApiResponse } from '../../../../shared/Models/response-model';
import { sharedImports } from '../../../../shared/Imports/shared-imports';

@Component({
  selector: 'stock-summary-create',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './stock-summary-create.component.html',
  styleUrl: './stock-summary-create.component.scss',
})
export class StockSummaryCreateComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  @Output() onSave = new EventEmitter<StockSummary>();

  private destroy = new Subject<void>();
  isActive: boolean = false;
  stockSummary: StockSummaryInsert = new StockSummaryInsert();
  products: ProductDropdown[] = [];

  constructor(
    injector: Injector,
    private stockSummaryService: StockSummaryService,
    private productService: ProductService,
  ) {
    super(injector);
  }

  ngOnInit() {}

  stockTypes = [
    { label: 'Inward', value: 'Inward' },
    { label: 'Outward', value: 'Outward' },
  ];

  loadProducts() {
    this.productService
      .getProduct()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<Product[]>) => {
          this.products = response.data;
        },
        error: (err) => {
          this.showMessage('Error', err.message, 'error');
        },
      });
  }

  show() {
    this.loadProducts();
    this.isActive = true;
    this.resetForm();
  }

  resetForm() {
    this.stockSummary = new StockSummaryInsert();
  }

  onSubmit() {
    if (this.stockSummary.productId <= 0) {
      this.showMessage('Error', 'Product is required', 'error');
      return;
    }

    if (!this.stockSummary.stockType) {
      this.showMessage('Error', 'Stock type is required', 'error');
      return;
    }

    if (this.stockSummary.quantity <= 0) {
      this.showMessage('Error', 'Quantity must be greater than 0', 'error');
      return;
    }

    this.stockSummaryService
      .insertStockSummary(this.stockSummary)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: any) => {
          this.isActive = false;
          this.onSave.emit(response.data);
          this.showMessage(
            'Success',
            'Stock summary created successfully',
            'success',
          );
        },

        error: (err) => {
          this.showMessage('Error', err.message, 'error');
        },
      });
  }

  onCancel() {
    this.isActive = false;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
