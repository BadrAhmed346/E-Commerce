import { Injectable } from '@angular/core';
import { IProduct } from '../Model/Interface/product';
import { productsData } from '../Model/Data/products';
import { categoriesData } from '../Model/Data/products';
import { brandsData } from '../Model/Data/products';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsServiceService {
  constructor() {}
  private products: IProduct[] = productsData;
  private product: IProduct = {
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
  private categories = categoriesData;
  private brands = brandsData;
  private searchSubject = new BehaviorSubject<string>('');

  searchText$ = this.searchSubject.asObservable();
  resetSearchText() {
    this.searchSubject.next('');
  }
  updateSearchText(searchText: string) {
    this.searchSubject.next(searchText);
  }

  //Method to get products
  getProducts(): IProduct[] {
    return this.products;
  }
  //Method to get categories
  getCategories(): String[] {
    return this.categories;
  }
  //Method to get brands
  getBrands() {
    return this.brands;
  }

  //Method to get product quantity
  getProductQuantity(id: number) {
    const product = this.getProductById(id);
    return product ? product.quantity : 0;
  }

  // Method to add a product
  addProduct(product: IProduct): void {
    const maxId = this.products.reduce(
      (max, product) => (product.id > max ? product.id : max),
      0
    );
    product.id = maxId + 1;
    this.products.push(product);
  }

  // Method to get a product by ID
  getProductById(id: number): IProduct | undefined {
    return this.products.find((p) => p.id === id);
  }

  updateProduct(updatedProduct: IProduct): void {
    this.products.map((product) => {
      if (product.id == updatedProduct.id) {
        product = updatedProduct;
      }
    });
  }

  // Method to delete a product
  deleteProduct(id: number): void {
    this.products = this.products.filter((p) => p.id !== id);
  }
}
