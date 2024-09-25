import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { categoriesData, brandsData } from 'src/app/Model/Data/products';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Input() showCategories: boolean = true;
  @Output() filterChange = new EventEmitter<{
    categories: string[];
    brands: string[];
  }>();

  categories: string[] = categoriesData;
  brands: string[] = brandsData;

  selectedCategories: string[] = [];
  selectedBrands: string[] = [];

  toggleCategory(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    this.emitFilterChange();
  }

  toggleBrand(brand: string): void {
    const index = this.selectedBrands.indexOf(brand);
    if (index === -1) {
      this.selectedBrands.push(brand);
    } else {
      this.selectedBrands.splice(index, 1);
    }
    this.emitFilterChange();
  }
  private emitFilterChange(): void {
    this.filterChange.emit({
      categories: this.selectedCategories,
      brands: this.selectedBrands,
    });
  }
}
