import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Api } from '../../core/services/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from "@angular/router";
import { AuthState } from '../../core/services/auth-state';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  email: string = '';
  password: string = '';
  isSubmitted: boolean = false;

  // Inject the new AuthStateService
  constructor(private api:Api, private router: Router, private authState: AuthState){}

  // Submit login with phone and password
  submitLogin() {
    this.isSubmitted = true;
    if (this.isValidEmail(this.email) && this.isValidPassword(this.password)) {
      console.log('Logging in with:', this.email);

      this.api.login({email: this.email, password:this.password}).subscribe({
        next: (res:any) =>{
          // 1. The browser automatically saves the httpOnly cookie securely.
          
          // 2. We broadcast the safe user data to the rest of the Angular app.
          // Remember your Express backend now sends: { message: "...", user: { id, name, role } }
          this.authState.setCurrentUser(res.user);

          // 3. Navigate the user to their dashboard
          this.router.navigate(['/my-account']);
        },
        error:(err) => {
          console.error("Login failed",err);
          alert(err.error?.message || "An error occurred during login.");
        }
      })
      
      
    }
  }

  // Validation: Email format
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validation: Password (min 6 chars)
  isValidPassword(pw: string): boolean {
    return typeof pw === 'string' && pw.trim().length >= 6;
  }
}
