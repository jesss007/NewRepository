import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, ProductInsert, ProductUpdate } from '../../Models/product';
import { OverlayModule } from 'primeng/overlay';
import { Subject, takeUntil } from 'rxjs';
import { ApiResponse } from '../../../../shared/Models/response-model';
import { ProductService } from '../../Services/product.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'product-create-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, OverlayModule, ToastModule],
  templateUrl: './product-create-edit.component.html',
  styleUrls: ['./product-create-edit.component.scss']
})
export class ProductCreateEditComponent implements OnInit, OnDestroy {

  private destroy = new Subject<void>();

  @Output() onSubmitted = new EventEmitter<Product>();

  productData: Product | null = null;
  isActive: boolean = false;

  product: Product = new Product();

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) { }

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
    if (this.product.pricePerUnit <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Price must be greater than 0' });
      return;
    }
    if (this.product.quantity <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Quantity must be greater than 0' });
      return;
    }
    if (!this.product.name.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Name is required' });
      return;
    }

    if (this.productData) {
      this.productService.updateProduct(this.product as ProductUpdate)
        .pipe(takeUntil(this.destroy))
        .subscribe({
          next: (response: ApiResponse<Product>) => {
            this.isActive = false;
            this.onSubmitted.emit(response.data);
            this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Product updated successfully' });
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
          }
        });
    } else {
      this.productService.insertProduct(this.product as ProductInsert)
        .pipe(takeUntil(this.destroy))
        .subscribe({
          next: (response: ApiResponse<Product>) => {
            this.isActive = false;
            this.onSubmitted.emit(response.data);
            this.messageService.add({ severity: 'success', summary: 'Created', detail: 'Product created successfully' });
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
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

