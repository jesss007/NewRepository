import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/product.service';
import { Product, ProductInsert, ProductUpdate, ProductFilter } from '../../Models/product';
import { Subject, takeUntil } from 'rxjs';
import { ApiResponse, MvGridConfig } from '../../../../shared/Models/response-model';
import { ProductCreateEditComponent } from '../product-create-edit/product-create-edit.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'product',
    standalone: true,
    imports: [CommonModule, FormsModule, ProductCreateEditComponent, TableModule, ButtonModule, InputTextModule, ToastModule],
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit, OnDestroy {
    private destroy = new Subject<void>();
    products: Product[] = [];
    currentPage = 1;
    pageSize = 5;
    totalRows = 0;

    filter: ProductFilter = { name: undefined };

    constructor(private productService: ProductService,
        private messageService : MessageService
    ) { }

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
        this.productService.getProductPaged(this.offset, this.pageSize, this.filter)
            .pipe(takeUntil(this.destroy))
            .subscribe({
                next: (response: ApiResponse<MvGridConfig<Product>>) => {
                    this.products = response.data.data; // the actual products 
                    this.totalRows = response.data.totalRows; // total rows  
                },
                error: (err) => {
                   this.messageService.add({severity: 'error', summary: 'error', detail: err.message});
                }
            });
    }


    onFilter() {
        this.currentPage = 1;
        this.loadProducts();
    }

    onClearFilter() {
        this.filter = { name: undefined };
        this.currentPage = 1;
        this.loadProducts();
    }

    onPageChange(page: number) {
        if (page < 1 || page > this.totalPages) {
            return
        };
        this.currentPage = page;
        this.loadProducts();
    }

    onSubmitted(savedProduct: Product) {
        const index = this.products.findIndex(p => p.id === savedProduct.id);
        if (index !== -1) {
            this.products[index] = savedProduct;
        }
        else {
            this.products.push(savedProduct);
        }
    }

    onDelete(product: Product) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.productService.deleteProduct({ id: product.id, deletedBy: 1 })
                .pipe(takeUntil(this.destroy))
                .subscribe({
                    next: (response: ApiResponse<Product>) => {
                        this.products = this.products.filter(u => u.id !== response.data.id);
                        this.messageService.add({severity: 'success', summary: 'Deleted', detail:'Product deleted successfully'});
                    },
                    error: (err) => {
                        this.messageService.add({severity: 'error', summary: 'Error', detail: err.message});
                    }
                });
        }

    }

    ngOnDestroy(): void {
        this.destroy.next();
        this.destroy.complete();
    }
}