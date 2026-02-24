import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Api } from '../../core/services/api';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from "@angular/router";

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
  isSubmitted: boolean = false;

  constructor(private api:Api){}

  // Submit registration form
  submitRegister() {
    this.isSubmitted = true;
    if (
      this.isValidName(this.name) &&
      this.isValidEmail(this.email) &&
      this.isValidPassword(this.password) &&
      this.isValidPhone(this.phone)
    ) {
      console.log('Registering user:', { name: this.name, email: this.email, phone: this.phone });
      // TODO: Call API to register user
      this.api.registerUser({name:this.name, email:this.email, password:this.password, phone:this.phone}).subscribe((res:any)=>{
          alert(res.message[0]);
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

  // Reset form
  resetForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.phone = '';
    this.isSubmitted = false;
  }
}
