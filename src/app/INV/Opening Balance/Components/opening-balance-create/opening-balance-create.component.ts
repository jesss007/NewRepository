import {
  Component,
  EventEmitter,
  Injector,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AppComponent } from '../../../../app.component';
import {
  ProductOpeningBalance,
  ProductOpeningBalanceInsert,
} from '../../Models/opening-balance';
import { Subject, takeUntil } from 'rxjs';
import { OpeningBalanceService } from '../../Services/product-opening-balance.service';
import { sharedImports } from '../../../../shared/Imports/shared-imports';
import { ApiResponse } from '../../../../shared/Models/response-model';
import { ProductDropdown } from '../../../Product/Models/product';
import { ProductService } from '../../../Product/Services/product.service';

@Component({
  selector: 'opening-balance-create',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './opening-balance-create.component.html',
  styleUrls: ['./opening-balance-create.component.scss'],
})
export class OpeningBalanceCreateComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  @Output() onSave = new EventEmitter<ProductOpeningBalance>();

  private destroy = new Subject<void>();
  isActive: boolean = false;
  openingBalance: ProductOpeningBalanceInsert = new ProductOpeningBalanceInsert();
  products: ProductDropdown[] = [];

  constructor(
    injector: Injector,
    private openingBalanceService: OpeningBalanceService,
    private productService: ProductService,
  ) {
    super(injector);
  }

  ngOnInit() {}

  loadProducts() {
    this.productService
      .getProductsDropdown()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<ProductDropdown[]>) => {
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
    this.openingBalance = new ProductOpeningBalanceInsert();
  }

  onSubmit() {
    if (this.openingBalance.productId <= 0) {
      this.showMessage('Error', 'Product is required', 'error');
      return;
    }

    if (this.openingBalance.quantity <= 0) {
      this.showMessage('Error', 'Quantity must be greater than 0', 'error');
      return;
    }

    this.openingBalanceService
      .insertOpeningBalance(this.openingBalance)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<ProductOpeningBalance>) => {
          this.isActive = false;
          this.onSave.emit(response.data);

          this.showMessage(
            'Success',
            'Opening Balance created successfully',
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
    this.resetForm();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
