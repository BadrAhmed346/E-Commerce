import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemCardComponent } from './Components/item-card/item-card.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AdsComponent } from './Components/ads/ads.component';
import { LoginRegisterComponent } from './Components/login-register/login-register.component';
import { HomeComponent } from './Components/home/home.component';
import { ItemDetailsComponent } from './Components/item-details/item-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductsNavBarComponent } from './Components/products-nav-bar/products-nav-bar.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './Components/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Services/auth.interceptor';
import { AdminNavBarComponent } from './Components/admin-nav-bar/admin-nav-bar.component';
import { AdminComponent } from './Components/admin/admin.component';
import { LaptopsComponent } from './Components/Laptops/laptops.component';
import { MobilesComponent } from './Components/mobiles/mobiles.component';
import { ProductsHomeComponent } from './Components/products-home/products-home.component';
import { BestSellerCardComponent } from './Components/best-seller-card/best-seller-card.component';
import { BestSellerSliderComponent } from './Components/best-seller-slider/best-seller-slider.component';
import { AdminProductComponent } from './Components/admin-product/admin-product.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { SearchFieldComponent } from './Components/search-field/search-field.component';
import { FilterComponent } from './Components/filter/filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ItemCardComponent,
    NavBarComponent,
    FooterComponent,
    AdsComponent,
    LoginRegisterComponent,
    HomeComponent,
    ItemDetailsComponent,
    ProductsComponent,
    ProductsNavBarComponent,
    CartComponent,
    AdminNavBarComponent,
    AdminComponent,
    LaptopsComponent,
    MobilesComponent,
    ProductsHomeComponent,
    BestSellerCardComponent,
    BestSellerSliderComponent,
    AdminProductComponent,
    AddProductComponent,
    SearchFieldComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
