import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Model/Interface/product';
import { CartServiceService } from 'src/app/Services/cart-service.service';
import { ProductsServiceService } from 'src/app/Services/products-service.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsServiceService,
    private cartService: CartServiceService
  ) {}

  selectedQuantity: number = 1;
  cartItemQuantity: number = 0;
  //initialize item variable
  item: IProduct = {
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

  //iniate item and find it at products array
  ngOnInit(): void {
    this.cartItemQuantity =
      this.cartService.getCartItemById(this.item.id)?.quantity ?? 0;
    let ID = Number(this.route.snapshot.paramMap.get('id'));
    let url = this.route.snapshot.url.map((segment) => segment.path).join('/');

    this.item = this.productService.getProductById(ID) || {
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
  }

  onQuantityChange() {
    this.cartItemQuantity =
      this.cartService.getCartItemById(this.item.id)?.quantity ?? 0;
  }
  //Add item to Cart
  addToCart() {
    let newItemCart: IProduct = { ...this.item };

    if (
      this.selectedQuantity > 0 &&
      this.selectedQuantity <= this.item.quantity
    ) {
      newItemCart.quantity = this.selectedQuantity; // Set the quantity for the item
      this.cartService.addToCart(newItemCart);
      alert('Item added to Cart.');
      this.selectedQuantity = 1;
    }
  }

  isAddToCartEnabled(): boolean {
    return (
      this.selectedQuantity > 0 && this.selectedQuantity <= this.item.quantity
    );
  }
}
