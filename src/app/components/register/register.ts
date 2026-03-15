import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Api } from '../../core/services/api';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, NgIf, HttpClientModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
  providers: [Api]
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  otp:string = '';
  isSubmitted: boolean = false;

  constructor(private api:Api, private router:Router){}

  // Submit registration form
  submitRegister() {
    this.isSubmitted = true;
    if (
      this.isValidName(this.name) &&
      this.isValidEmail(this.email) &&
      this.isValidPassword(this.password) &&
      this.isValidOTP(this.otp) &&
      this.isValidPhone(this.phone)
    ) {
      console.log('Registering user:', { name: this.name, email: this.email, phone: this.phone, otp:this.otp});
      // TODO: Call API to register user
      this.api.registerUser({name:this.name, email:this.email, password:this.password, phone:this.phone, otp:this.otp}).subscribe({
        next:(res:any)=>{
          alert(res.message);
          this.router.navigate(['/my-account']);
        },
        error:(err)=>{
          alert(err.error.message+". Try again with different phone number or email address.");
        }
      }
      );
      
      this.resetForm();
    }
  }

  // Validation: Name (at least 2 chars)
  isValidName(name: string): boolean {
    return typeof name === 'string' && name.trim().length >= 2;
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

  // Validation: Phone number (10-15 digits)
  isValidPhone(phone: string): boolean {
    const clean = phone.replace(/\D/g, '');
    return clean.length >= 10 && clean.length <= 15;
  }

  // Validation: Password (min 6 chars)
  isValidOTP(otp: string): boolean {
    return typeof otp === 'string';
  }

  // Reset form
  resetForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.phone = '';
    this.otp = '';
    this.isSubmitted = false;
  }
}
