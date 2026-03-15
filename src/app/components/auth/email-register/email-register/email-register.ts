import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../../../core/services/api';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-email-register',
  imports: [FormsModule,RouterLink,NgIf],
  templateUrl: './email-register.html',
  styleUrl: './email-register.css',
})
export class EmailRegister {
  
  email: string = '';
  
  isSubmitted: boolean = false;

  constructor(private api:Api, private router:Router){}

  // Submit registration form
  submitRegister() {
    this.isSubmitted = true;
    if (
      
      this.isValidEmail(this.email) 
      
    ) {
      console.log('Registering user:', {email: this.email});
      // TODO: Call API to register user
      this.api.requestOTP({email:this.email}).subscribe({
        next:(res:any)=>{
          alert(res.message);
          this.router.navigate(['/register']);
        },
        error:(err)=>{
          alert(err.error.message+". Try again with different phone number or email address.");
        }
      }
      );
      
      this.resetForm();
    }
  }

  

  // Validation: Email format
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  // Reset form
  resetForm() {
    
    this.email = '';
    
    
    this.isSubmitted = false;
  }
}
