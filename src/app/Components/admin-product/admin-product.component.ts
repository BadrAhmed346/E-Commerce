import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/Model/Interface/product';
import { ProductsServiceService } from 'src/app/Services/products-service.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private productService: ProductsServiceService
  ) {}

  products: IProduct[] = []; // This should be fetched from a service
  currentProductsList: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  searchSubscription!: Subscription;
  currentPage: number = 0;
  itemsPerPage: number = 10;

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    this.searchSubscription = this.productService.searchText$.subscribe(
      (searchText) => {
        if (!searchText) {
          this.filteredProducts = [...this.products]; // Reset to all products
        } else {
          this.filteredProducts = this.products.filter(
            (product) =>
              product.name.toLowerCase().includes(searchText.toLowerCase()) ||
              product.category
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              product.brand.toLowerCase().includes(searchText.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              product.price == Number(searchText)
          );
        }
        this.updateCurrentProductsList();
      }
    );

    // this.updateCurrentProductsList();
  }

  updateCurrentProductsList() {
    const start = this.currentPage * this.itemsPerPage;
    this.currentProductsList = this.filteredProducts.slice(
      start,
      start + this.itemsPerPage
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updateCurrentProductsList();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateCurrentProductsList();
    }
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  editProduct(productId: number) {
    this.router.navigate(['/admin/adminProduct', productId]);
  }

  deleteProduct(productId: number) {
    console.log('Delete', productId);
    this.productService.deleteProduct(productId);
    this.ngOnInit();
    this.updateCurrentProductsList();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
