import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  username: string = '';
  email: string = '';
  password: string = '';
  isLoginMode: boolean = true;

  onSubmit() {
    if (this.isLoginMode) {
      this.authService
        .login(this.email, this.password)
        .subscribe((response) => {
          if (response.token) {
            console.log('Login successful');
            this.router.navigate(['/home']); // Redirect after login
          } else {
            console.log(response.error);
          }
        });
    } else {
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.authService.register(newUser).subscribe((response) => {
        if (response.success) {
          console.log('Registration successful');
          this.isLoginMode = !this.isLoginMode;
          // this.router.navigate(['/login-register']);
        } else {
          console.log(response.message);
        }
      });
    }
  }

  // Toggle between login and registration mode
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
