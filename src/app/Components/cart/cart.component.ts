import { Component } from '@angular/core';
import { IProduct } from 'src/app/Model/Interface/product';
import { CartServiceService } from 'src/app/Services/cart-service.service';
import { ProductsServiceService } from 'src/app/Services/products-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(
    private cartService: CartServiceService,
    private productService: ProductsServiceService
  ) {}

  cartItems: IProduct[] = [];

  ngOnInit(): void {
    this.cartItems = this.cartService.getcart();
  }
  get totalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity, // Calculate total based on items
      0
    );
  }

  increaseQuantity(product: IProduct) {
    let availableQuantity: number = 0;
    availableQuantity = this.productService.getProductQuantity(product.id);
    // Now check if the quantity in cart is less than the available quantity in stock
    if (product.quantity < availableQuantity) {
      product.quantity++;
    } else {
      alert('Cannot increase quantity. Max stock reached.');
      // console.log('Cannot increase quantity. Max stock reached.');
    }
  }

  decreaseQuantity(product: IProduct) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  removeProduct(product: IProduct) {
    this.cartService.deleteCartItem(product.id);
    this.ngOnInit();
  }
}
