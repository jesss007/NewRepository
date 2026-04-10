import { Component, EventEmitter, OnDestroy, OnInit, Output, Injector } from '@angular/core';
import { Product, ProductInsert, ProductUpdate } from '../../Models/product';
import { Subject, takeUntil } from 'rxjs';
import { ApiResponse } from '../../../../shared/Models/response-model';
import { ProductService } from '../../Services/product.service';
import { AppComponent } from '../../../../app.component';
import { primeNgImports } from '../../../../shared/prime-ng-imports';
import { sharedImports } from '../../../../shared/shared-imports';

@Component({
  selector: 'product-create-edit',
  standalone: true,
  imports: [primeNgImports, sharedImports],
  templateUrl: './product-create-edit.component.html',
  styleUrls: ['./product-create-edit.component.scss']
})
export class ProductCreateEditComponent extends AppComponent implements OnInit, OnDestroy {

  private destroy = new Subject<void>();

  @Output() onSave = new EventEmitter<Product>();

  productData: Product | null = null;
  isActive: boolean = false;

  product: Product = new Product();

  constructor(injector: Injector, private productService: ProductService) {
    super(injector);
  }

  ngOnInit() {

  }

  show(product?: Product) {
    this.productData = product || null;
    this.initializeForm();
    this.isActive = true;
  }

  initializeForm() {
    this.product = {
      id: this.productData?.id || 0,
      name: this.productData?.name || '',
      description: this.productData?.description || '',
      pricePerUnit: this.productData?.pricePerUnit || 0,
      status: this.productData?.status || 1,
      quantity: this.productData?.quantity || 0,
      productCode: this.productData?.productCode || '',
    };
  }

  onSubmit() {
    if (!this.product.name.trim()) {
      this.showMessage('Error', 'Name is required', 'error');
      return;
    }

    if (this.product.pricePerUnit <= 0) {
      this.showMessage('Error', 'Price must be greater than 0', 'error');
      return;
    }
    if (this.productData) {
      this.productService.updateProduct(this.product as ProductUpdate)
        .pipe(takeUntil(this.destroy))
        .subscribe({
          next: (response: ApiResponse<Product>) => {
            this.isActive = false;
            this.onSave.emit(response.data);
            this.showMessage('Updated', 'Product updated successfully', 'success');
          },
          error: (err) => {
            this.showMessage('Error', err.message, 'error');
          }
        });
    } else {
      this.productService.insertProduct(this.product as ProductInsert)
        .pipe(takeUntil(this.destroy))
        .subscribe({
          next: (response: ApiResponse<Product>) => {
            this.isActive = false;
            this.onSave.emit(response.data);
            this.showMessage('Created', 'Product created successfully', 'success');
          },
          error: (err) => {
            this.showMessage('Error', err.message, 'error');
          }
        });
    }
  }

  onCancel() {
    this.isActive = false;   
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}

