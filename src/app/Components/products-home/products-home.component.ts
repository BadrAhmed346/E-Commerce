import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/Model/Interface/product';
import { ProductsServiceService } from 'src/app/Services/products-service.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css'],
})
export class ProductsHomeComponent {
  constructor(private productService: ProductsServiceService) {}
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  searchSubscription!: Subscription;

  ngOnInit(): void {
    this.filteredProducts = this.products; //filter

    this.products = this.productService
      .getProducts()
      .filter((product) => product.bestSeller == true);
    this.searchSubscription = this.productService.searchText$.subscribe(
      (searchText) => {
        this.filteredProducts = this.products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchText.toLowerCase()) ||
            product.category.toLowerCase().includes(searchText.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchText.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            product.price == Number(searchText)
        );
      }
    );
  }
  onFilterChange(filters: { categories: string[]; brands: string[] }): void {
    const { categories, brands } = filters;

    this.filteredProducts = this.products.filter((product) => {
      const isCategoryMatch =
        categories.length === 0 || categories.includes(product.category);
      const isBrandMatch =
        brands.length === 0 || brands.includes(product.brand);

      return isCategoryMatch && isBrandMatch;
    });
  }
  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.searchSubscription.unsubscribe();
  }
}
