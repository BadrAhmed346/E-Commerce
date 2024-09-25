import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { ProductsServiceService } from 'src/app/Services/products-service.service';
import { SearchFieldComponent } from '../search-field/search-field.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @ViewChild(SearchFieldComponent) searchComponent!: SearchFieldComponent;
  constructor(public authService: AuthServiceService, private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Call the clearSearch method to reset the search when navigating
        if (this.searchComponent) {
          this.searchComponent.clearSearch();
        }
      }
    });
  }
}
