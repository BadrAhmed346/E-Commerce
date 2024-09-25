import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Model/Interface/product';
import { ProductsServiceService } from 'src/app/Services/products-service.service';

@Component({
  selector: 'app-best-seller-slider',
  templateUrl: './best-seller-slider.component.html',
  styleUrls: ['./best-seller-slider.component.css'],
})
export class BestSellerSliderComponent implements OnInit {
  @Input() products: IProduct[] = []; // Initialize with an empty array

  slidePosition: number = 0;
  slideWidth: number = 200; // Width of each slide
  autoSlideInterval: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.slidePosition -= this.slideWidth;

      // If we've scrolled past the last image, reset to the start
      if (
        Math.abs(this.slidePosition) >=
        this.products.length * this.slideWidth
      ) {
        this.slidePosition = 0; // Reset to the first image
      }
    }, 3000); // Slide every 3 seconds
  }

  ngOnDestroy() {
    clearInterval(this.autoSlideInterval); // Clear the interval on component destroy
  }
}
