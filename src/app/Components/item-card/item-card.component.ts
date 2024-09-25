import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Model/Interface/product';
import { CartServiceService } from 'src/app/Services/cart-service.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css'],
})
export class ItemCardComponent {
  constructor(private route: Router, private cartService: CartServiceService) {}

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
  addToCart(product: IProduct) {
    let itemCart: IProduct = { ...product };

    itemCart.quantity = 1; // Set the quantity for the item
    this.cartService.addToCart(itemCart);
    alert('Item added to Cart.');
  }
}
