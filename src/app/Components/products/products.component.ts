import { Component } from '@angular/core';
import { IProduct } from 'src/app/Model/Interface/product';
import { ProductsServiceService } from 'src/app/Services/products-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  childRouteClicked = false;
  constructor(
    private productService: ProductsServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  products: IProduct[] = [];

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.childRouteClicked = this.route.firstChild !== null;
    });
    this.products = this.productService.getProducts();
  }
}
