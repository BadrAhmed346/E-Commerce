import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Model/Interface/product';

@Component({
  selector: 'app-best-seller-card',
  templateUrl: './best-seller-card.component.html',
  styleUrls: ['./best-seller-card.component.css'],
})
export class BestSellerCardComponent {
  constructor(private route: Router) {}
  @Input() ProductInput: IProduct = {
    id: 0,
    name: '',
    quantity: 0,
    price: 0,
    description: '',
    imageUrl: '',
    category: '',
    brand: '',
    rating: 0,
    bestSeller: false,
  };

  routeToProductDetails() {
    this.route.navigate([
      '/products',
      `${this.ProductInput.category.toLowerCase()}s`,
      this.ProductInput.id,
    ]);
  }
}
