import { Component } from '@angular/core';
import { IProduct } from 'src/app/Model/Interface/product';
import { ProductsServiceService } from 'src/app/Services/products-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private productService: ProductsServiceService) {}
  products: IProduct[] = [];
  mobiles: IProduct[] = [];
  laptops: IProduct[] = [];

  ngOnInit(): void {
    this.products = this.productService
      .getProducts()
      .filter((product) => product.bestSeller == true);
    ////////////
    this.mobiles = this.productService
      .getProducts()
      .filter((product) => product.category == 'Mobile');
    ////////////
    this.laptops = this.productService
      .getProducts()
      .filter((product) => product.category == 'Laptop');
  }
}
