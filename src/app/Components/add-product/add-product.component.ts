import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Model/Interface/product';
import { ProductsServiceService } from 'src/app/Services/products-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsServiceService
  ) {}
  product: IProduct = {
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
  categories: String[] = [];
  brands: String[] = [];

  ngOnInit(): void {
    //getting Categories from Service
    this.categories = this.productService.getCategories();
    //getting Brands from Service
    this.brands = this.productService.getBrands();
    //getting product from Service
    let ID = Number(this.route.snapshot.paramMap.get('id'));
    let url = this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.product = this.productService.getProductById(ID) || {
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

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Handle file selection and update product image
      // Use FileReader to display selected image (optional)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProduct() {
    if (this.product?.id) {
      this.productService.updateProduct(this.product);
      console.log('Updating product...', this.product);
      this.router.navigate(['/admin']);
    } else {
      this.productService.addProduct(this.product);
      console.log('Adding new product...', this.product);
      this.router.navigate(['/admin']);
    }
  }
}
