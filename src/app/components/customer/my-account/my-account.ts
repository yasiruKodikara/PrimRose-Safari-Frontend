import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from '../../../core/services/auth-state';
import { Api, Booking } from '../../../core/services/api';
import { IDeactivateGuard } from '../../../core/guards/deactivate-guard';
import { DatePipe, DecimalPipe, NgClass, NgFor, TitleCasePipe, UpperCasePipe } from '@angular/common';


interface MyAccountProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  
}

// export interface Booking {
//   id: number;
//   status: 'confirmed' | 'pending' | 'cancelled' | 'refunded'; // Using union types for better type safety
//   item_type: 'room' | 'safari' | 'vehicle'; // Specific types based on your project
  
//   // Financials
//   total_amount: string | number; // APIs often return decimals as strings to preserve precision
  
//   // Guest Information
//   name: string;
//   email: string;
//   phone: string;
  
//   // Reservation Details
//   start_date: string | Date;
//   end_date: string | Date;
//   quantity: number;
  
//   // Metadata
//   user_id?: number; // Optional if the guest is a "guest" and not a registered user
//   created_at: string | Date;
//   updated_at?: string | Date;
// }


@Component({
  selector: 'app-my-account',
  imports: [NgFor,DatePipe,DecimalPipe,TitleCasePipe,UpperCasePipe,NgClass],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})


export class MyAccount implements IDeactivateGuard, OnInit{
  constructor(private api:Api, private router: Router, private authState: AuthState){

  }

  user: MyAccountProps[] = [];
  boookings: Booking[] = [];
  userName:string ='';
  userRole:string ='';
  bookingCount:number = 0;

  canDeactivate(): boolean {
    return confirm('Are you sure you want to leave?');
  }
  onLogout() {
    this.api.logout().subscribe({
      next: () => {
        // 1. The backend just destroyed the httpOnly cookie!
        
        // 2. Clear the user out of Angular's memory globally
        this.authState.setCurrentUser(null);
        
        // 3. Send them back to the login page
        this.router.navigate(['/auth']);
      },
      error: (err) => {
        console.error('Logout failed on the server, but clearing local state anyway.', err);
        // Best practice: Even if the server fails, log them out locally so they aren't stuck
        this.authState.setCurrentUser(null);
        this.router.navigate(['/auth']);
      }
    });

    


}

  
  ngOnInit(): void {
    //updating UI
    this.userName = this.authState.currentUserValue?.name || '';
    this.userRole = this.authState.currentUserValue?.role || '';

    //contact information
    this.api.getUser(this.authState.currentUserValue?.id || 0).subscribe({
      next: (userData) => {
        // Ensure userData is wrapped in an array if it's a single object
        this.user = Array.isArray(userData) ? userData : [userData];
        console.log('User contact information:', this.user);

        
  
      },
      error: (err) => {
        console.error('Failed to fetch user contact information', err);
      }
    });

    this.api.getBookingsByUserId(this.authState.currentUserValue?.id || 0).subscribe({
      next: (bookingsData) => {
        console.log('User bookings:', bookingsData);
        // You can store this in a component property if you want to display it in the template
        this.boookings = bookingsData;
      },
      error: (err) => {
        console.error('Failed to fetch user bookings', err);
      }
    });

    this.api.getBookingCountByUser(this.authState.currentUserValue?.id || 0).subscribe({
      next:(res)=>{
        this.bookingCount = res[0]["count"];
        console.log(this.bookingCount)
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  dashNav(){
    if(this.userRole === 'customer'){
      this.router.navigate(['/my-account']);
    }else if(this.userRole === 'admin'){
      this.router.navigate(['/admin']);
    }
  }

}
