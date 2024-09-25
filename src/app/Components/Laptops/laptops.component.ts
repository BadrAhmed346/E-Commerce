import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/Model/Interface/product';
import { ProductsServiceService } from 'src/app/Services/products-service.service';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.css'],
})
export class LaptopsComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductsServiceService) {}
  laptops: IProduct[] = [];
  filteredLaptops: IProduct[] = [];
  searchSubscription!: Subscription;

  ngOnInit(): void {
    this.filteredLaptops = this.laptops; //filter

    this.laptops = this.productService
      .getProducts()
      .filter((product) => product.category == 'Laptop');

    this.searchSubscription = this.productService.searchText$.subscribe(
      (searchText) => {
        this.filteredLaptops = this.laptops.filter(
          (laptop) =>
            laptop.name.toLowerCase().includes(searchText.toLowerCase()) ||
            laptop.category.toLowerCase().includes(searchText.toLowerCase()) ||
            laptop.brand.toLowerCase().includes(searchText.toLowerCase()) ||
            laptop.description
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            laptop.price == Number(searchText)
        );
      }
    );
  }

  onFilterChange(filters: { categories: string[]; brands: string[] }): void {
    const { categories, brands } = filters;

    this.filteredLaptops = this.laptops.filter((product) => {
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
