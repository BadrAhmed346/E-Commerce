import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private users = [
    {
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin123',
      role: 'admin',
    },
    {
      username: 'user',
      email: 'user@user.com',
      password: 'user123',
      role: 'user',
    },
  ];

  constructor() {
    const existingUsers = localStorage.getItem('users');

    // Only set users if none exist in localStorage
    if (!existingUsers) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  // Login using localStorage (no API call)
  login(username: string, password: string): Observable<any> {
    // console.log(username, '===', password);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // console.log('Users from localStorage:', users); // Check the users in localStorage

    const user = users.find(
      (u: any) =>
        (u.username === username || u.email === username) &&
        u.password === password
    );

    if (user) {
      const token = `token-${user.username}-${Date.now()}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // console.log('Login successful for user:', user); // Log successful login
      return of({ token, user });
    } else {
      console.log('Login failed for username:', username); // Log failed login attempt
      return of({ error: 'Invalid username or password' });
    }
  }
  // Register a new user
  register(newUser: any): Observable<any> {
    newUser.role = 'user'; // if finished the manage admins page
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check for both username and email
    const existingUser = users.find(
      (user: any) =>
        user.email === newUser.email || user.username === newUser.username
    );

    if (existingUser) {
      return of({ success: false, message: 'User already exists!' });
    } else {
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      return of({ success: true, message: 'Registration successful!' });
    }
  }

  // Get the token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Get logged-in user data
  getUserData(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Check if the logged-in user is an admin
  isAdmin(): boolean {
    const user = this.getUserData();
    return user && user.role === 'admin';
  }

  // Logout and clear local storage
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
