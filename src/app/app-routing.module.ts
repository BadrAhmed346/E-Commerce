import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaptopsComponent } from './Components/Laptops/laptops.component';
import { LoginRegisterComponent } from './Components/login-register/login-register.component';
import { HomeComponent } from './Components/home/home.component';
import { ItemDetailsComponent } from './Components/item-details/item-details.component';
import { MobilesComponent } from './Components/mobiles/mobiles.component';
import { ProductsComponent } from './Components/products/products.component';
import { authGuard } from './Services/auth.guard';
import { adminGuard } from './Services/admin.guard';
import { CartComponent } from './Components/cart/cart.component';
import { AdminComponent } from './Components/admin/admin.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { AdminProductComponent } from './Components/admin-product/admin-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login-register', component: LoginRegisterComponent },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: 'laptops', component: LaptopsComponent },
      { path: 'laptops/:id', component: ItemDetailsComponent },
      { path: 'mobiles', component: MobilesComponent },
      { path: 'mobiles/:id', component: ItemDetailsComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' }, // Redirect to products when accessing /admin
      { path: 'products', component: AdminProductComponent }, // Ensure this is the correct component
      { path: 'adminProduct', component: AddProductComponent },
      { path: 'adminProduct/:id', component: AddProductComponent },
    ],
  },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
