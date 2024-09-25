import { Component } from '@angular/core';
import { ProductsServiceService } from 'src/app/Services/products-service.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css'],
})
export class SearchFieldComponent {
  searchText: string = '';

  constructor(private productService: ProductsServiceService) {}
  onSearchChange(searchText: string) {
    this.productService.updateSearchText(searchText);
  }
  clearSearch() {
    this.searchText = ''; // Clear the input field
    this.productService.resetSearchText(); // Reset the search service
  }
}
