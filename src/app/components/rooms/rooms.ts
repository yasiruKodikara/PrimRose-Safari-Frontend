import { Component } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../../core/services/api';
import { HttpClientModule } from '@angular/common/http';
import { AuthState } from '../../core/services/auth-state';


declare const bootstrap: any;

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule,HttpClientModule],
  templateUrl: './rooms.html',
  styleUrls: ['./rooms.css'],
  providers:[Api]
})
export class Rooms {
  isBooked: boolean = false;
  constructor(private api:Api,private authState:AuthState){}
  rooms:any[] = [];
  

  // Booking state
  selectedRoom: any = null;
  booking: { start_date: string; end_date: string; quantity: number } = { start_date: '', end_date: '', quantity: 1 };
  isBookingSubmitted: boolean = false;

  // Open booking modal (triggered by buttons)
  openBooking(room: any) {
    this.selectedRoom = room;
    this.booking = { start_date: '', end_date: '', quantity: 1 };
    this.isBookingSubmitted = false;
    // modal will be shown via data-bs attributes on the button
  }

  // Submit booking from modal
  submitBooking(form: NgForm) {
    this.isBookingSubmitted = true;
    if (form.valid) {
      const user_id = this.authState.currentUserValue?.id;
      
      const bookingData = {
        user_id: user_id,
        room_id: this.selectedRoom.id,
        start_date: this.booking.start_date,
        end_date: this.booking.end_date,
        quantity: this.booking.quantity
      };

      this.api.bookRoom(bookingData).subscribe(response => {
        console.log('Booking successful:', response);
        alert(response.message);
        this.isBooked = true;
      }, error => {
        alert(error.error.message);
        
        console.error('Booking failed:', error);
      });

      // close modal
      const modalEl = document.getElementById('bookingModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      }
    }
  }

  shopMore(room: any) {
    // reuse modal for shop more (view details + booking)
    this.openBooking(room);
  }

  /**
   * Calculate number of days between booking.start_date and booking.end_date.
   * Returns 0 if either date is missing. Minimum 1 day when both dates present.
   */
  getBookingDays(): number {
    const { start_date, end_date } = this.booking;
    if (!start_date || !end_date) return 0;
    const start = new Date(start_date);
    const end = new Date(end_date);
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffMs = end.getTime() - start.getTime();
    const days = Math.ceil(diffMs / msPerDay);
    return Math.max(1, days);
  }

  /**
   * Calculate total price using selectedRoom price_per_night, booking days and quantity
   */
  getBookingTotal(): number {
    if (!this.selectedRoom) return 0;
    const days = this.getBookingDays();
    const price = this.selectedRoom.price_per_night || this.selectedRoom.price || 0;
    const qty = this.booking.quantity || 1;
    return price * days * qty;
  }

  ngOnInit(){
    this.api.getRooms().subscribe((data: any) => {
      console.log('Fetched rooms:', data);
      this.rooms = data;
    });
  }
}
