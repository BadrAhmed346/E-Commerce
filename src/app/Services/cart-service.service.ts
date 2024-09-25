import { Injectable } from '@angular/core';
import { IProduct } from '../Model/Interface/product';
import { cartData } from '../Model/Data/cart';
import { ProductsServiceService } from './products-service.service';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  constructor(private productService: ProductsServiceService) {}

  private cartItems: IProduct[] = cartData;

  // Method to get all cartItems
  getcart(): IProduct[] {
    return this.cartItems;
  }

  // Method to add a product
  addToCart(item: IProduct): void {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItem) {
      existingItem.quantity += item.quantity; // Update quantity if it already exists
    } else {
      this.cartItems.push({ ...item }); // Add new item to cart
    }
    if ((item.category = 'Laptop')) {
      this.productService.updateProduct(item);
    } else if ((item.category = 'Mobile')) {
    }
  }

  // Method to get a product by ID
  getCartItemById(id: number): IProduct | undefined {
    return this.cartItems.find((item) => item.id === id);
  }

  // Method to update a product
  updateCartItem(updatedItem: IProduct): void {
    this.cartItems.map((item) => {
      if ((item.id = updatedItem.id)) {
        item = updatedItem;
      }
    });
  }

  // Method to delete a product
  deleteCartItem(id: number): void {
    this.cartItems = this.cartItems.filter((p) => p.id != id);
  }
}
