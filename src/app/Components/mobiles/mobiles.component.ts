import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/Model/Interface/product';
import { ProductsServiceService } from 'src/app/Services/products-service.service';

@Component({
  selector: 'app-mobiles',
  templateUrl: './mobiles.component.html',
  styleUrls: ['./mobiles.component.css'],
})
export class MobilesComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductsServiceService) {}

  mobiles: IProduct[] = [];
  filteredMobiles: IProduct[] = [];
  searchSubscription!: Subscription;

  ngOnInit(): void {
    this.filteredMobiles = this.mobiles; //filter

    // this.productService.resetSearchText();
    this.mobiles = this.productService
      .getProducts()
      .filter((product) => product.category == 'Mobile');
    //Searched Mobiles
    this.searchSubscription = this.productService.searchText$.subscribe(
      (searchText) => {
        this.filteredMobiles = this.mobiles.filter(
          (mobile) =>
            mobile.name.toLowerCase().includes(searchText.toLowerCase()) ||
            mobile.category.toLowerCase().includes(searchText.toLowerCase()) ||
            mobile.brand.toLowerCase().includes(searchText.toLowerCase()) ||
            mobile.description
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            mobile.price == Number(searchText)
        );
      }
    );
  }
  onFilterChange(filters: { categories: string[]; brands: string[] }): void {
    const { categories, brands } = filters;

    this.filteredMobiles = this.mobiles.filter((product) => {
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
