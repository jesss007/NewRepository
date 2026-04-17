import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Subject, takeUntil } from 'rxjs';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../../shared/Models/response-model';
import { ProductCreateEditComponent } from '../product-create-edit/product-create-edit.component';
import { AppComponent } from '../../../../app.component';
import { Product, ProductFilter } from '../../Models/product';
import { sharedImports } from '../../../../shared/Imports/shared-imports';
import { Router } from '@angular/router';

@Component({
  selector: 'product',
  standalone: true,
  imports: [sharedImports, ProductCreateEditComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  private destroy = new Subject<void>();
  products: Product[] = [];
  currentPage = 1;
  pageSize = 7;
  totalRows = 0;

  filter: ProductFilter = {
    search: undefined,
    status: undefined,
  };

  statusOptions = [
    { label: 'All Status', value: null },
    { label: 'For Sale', value: 1 },
    { label: 'Not For Sale', value: 2 },
    { label: 'On Hold', value: 3 },
  ];

  constructor(
    injector: Injector,
    private productService: ProductService,
    private router: Router,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.totalRows / this.pageSize);
    //10 rows / 5 per page = 2 pages
  }

  get offset(): number {
    return (this.currentPage - 1) * this.pageSize;
    //pg1 ->  (1-1) * 5 = 0
  }

  loadProducts() {
    this.productService
      .getProductPaged(this.offset, this.pageSize, this.filter)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<MvGridConfig<Product>>) => {
          this.products = response.data.data ?? []; // the actual products
          this.totalRows = response.data.totalRows; // total rows
        },
        error: (err) => {
          this.showMessage('Error', err.message, 'error');
        },
      });
  }

  onFilter() {
    this.currentPage = 1;
    this.loadProducts();
  }

  onClearFilter() {
    this.filter = {
      search: undefined,
      status: undefined,
    };
    this.currentPage = 1;
    this.loadProducts();
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadProducts();
  }

  onSave(submitProduct: Product) {
    const index = this.products.findIndex((p) => p.id === submitProduct.id);

    if (index !== -1) {
      this.products[index] = submitProduct;
      return;
    }

    if (this.products.length < this.pageSize) {
      this.products[this.products.length] = submitProduct;
    }
  }
  onDelete(product: Product) {
    this.confirmAction({
      message: 'Are you sure you want to delete this product',
      header: 'Delete Confirmation',
      accept: () => {
        this.productService
          .deleteProduct({ id: product.id, deletedBy: 1 })
          .pipe(takeUntil(this.destroy))
          .subscribe({
            next: (response: ApiResponse<Product>) => {
              this.products = this.products.filter(
                (u) => u.id !== response.data.id,
              );
              this.showMessage(
                'Deleted',
                'Product deleted successfully',
                'success',
              );
            },
            error: (err) => {
              this.showMessage('Error', err.message, 'error');
            },
          });
      },
      reject: () => {
        this.showMessage('Cancel', 'Product deletion cancelled', 'info');
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}


