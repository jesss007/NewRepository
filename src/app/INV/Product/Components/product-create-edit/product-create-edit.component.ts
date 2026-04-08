import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, ProductInsert, ProductUpdate } from '../../Models/product';
import { OverlayModule } from 'primeng/overlay';

@Component({
  selector: 'product-create-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, OverlayModule],
  templateUrl: './product-create-edit.component.html',
  styleUrl: './product-create-edit.component.scss'
})
export class ProductCreateEditComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<ProductInsert | ProductUpdate>();
  @Output() onCancel = new EventEmitter();

  @Input() productData: Product | null = null;
  isActive: boolean = false;

  newProduct: ProductInsert = {
    name: '',
    description: '',
    pricePerUnit: 0,
    status: 1,
    quantity: 0,
    productCode: '',
    createdBy: 1
  };

  editProduct: ProductUpdate = {
    id: 0,
    pricePerUnit: 0,
    status: 1,
    quantity: 0,
  };

  ngOnInit() {
    this.initializeForm();
  }


  initializeForm() {
    if (this.productData) {
      this.editProduct = {
        id: this.productData.id,
        pricePerUnit: this.productData.pricePerUnit,
        status: this.productData.status,
        quantity: this.productData.quantity
      };
    } else {
      this.newProduct = {
        name: '',
        description: '',
        pricePerUnit: 0,
        status: 1,
        quantity: 0,
        productCode: '',
        createdBy: 1
      };
    }
  }

  submitForm() {
    if (this.productData) {

      if (this.editProduct.pricePerUnit <= 0) {
        alert('Price must be greater than 0');
        return;
      }
      if (this.editProduct.quantity <= 0) {
        alert('Quantity cannot be negative');
        return;
      }
      this.onSubmit.emit(this.editProduct);
    } else {

      if(!this.newProduct.name.trim()){
        alert('Name is required');
        return;
      }
      this.onSubmit.emit(this.newProduct);
    }
  }

  cancelForm() {
    this.onCancel.emit();
  }

}
