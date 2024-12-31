import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';
  private usersKey = 'users';
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private users: any[] = [];

  constructor(private router: Router) {
    const storedUsers = localStorage.getItem(this.usersKey);
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  signUp(user: { email: string; password: string }) {
    if (this.users.some((u) => u.email === user.email)) {
      alert('Email already registered!');
      return;
    }

    this.users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(this.users));
    alert('Signup successful!');
    this.router.navigate(['/login']); // Redirect to login after signup
  }

  login(credentials: { email: string; password: string }) {
    const user = this.users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      const token = 'fake-jwt-token'; // Simulate a JWT token
      localStorage.setItem(this.tokenKey, token);
      this.isAuthenticated.next(true);
      alert('Login successful!');
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials!');
    }
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated.next(false);
    alert('Logged out successfully!');
    this.router.navigate(['/login']);
  }
}
