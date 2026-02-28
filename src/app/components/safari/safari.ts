import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../../core/services/api';
import { HttpClientModule } from '@angular/common/http';
import { AuthState } from '../../core/services/auth-state';

declare const bootstrap: any;

@Component({
  selector: 'app-safari',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './safari.html',
  styleUrl: './safari.css',
  
})
export class Safari {
  constructor(private api:Api,private authState:AuthState){

  }
  safaris:any = [];
  // Booking state
  selectedSafari: any = null;
  booking: { start_date: string; end_date: string; quantity: number } = { start_date: '', end_date: '', quantity: 1 };
  isBookingSubmitted: boolean = false;

  openBooking(safari: any) {
    this.selectedSafari = safari;
    this.booking = { start_date: '', end_date: '', quantity: 1 };
    this.isBookingSubmitted = false;
  }

  submitBooking(form: NgForm) {
    this.isBookingSubmitted = true;
    if (form.valid) {

      const user_id = this.authState.currentUserValue?.id;
      const bookingData = {
        user_id: user_id,
        safari_id: this.selectedSafari.id,
        start_date: this.booking.start_date,
        end_date: this.booking.end_date,
        quantity: this.booking.quantity
      };
      
      const modalEl = document.getElementById('safariBookingModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        this.api.bookSafari(bookingData).subscribe({
          next:(res:any)=>{
          console.log(res.message);
          alert(res.message);
        },
          error:(error)=>{
            console.error(error);
            alert(error.message);
          }
      })
        modal.hide();
      }
    }
  }

  shopMore(safari: any) {
    console.log('Shop more details:', safari.name);
    alert(`Details for: ${safari.name}`);
  }

  private parsePrice(value: any): number {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    const match = String(value).match(/[\d,.]+/);
    if (!match) return 0;
    return parseFloat(match[0].replace(/,/g, '')) || 0;
  }

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

  getBookingTotal(): number {
    if (!this.selectedSafari) return 0;
    const days = this.getBookingDays();
    const price = this.parsePrice(this.selectedSafari.price);
    const qty = this.booking.quantity || 1;
    return price * days * qty;
  }

  ngOnInit(){
    this.api.getSafariJeeps().subscribe((data: any) => {
      this.safaris = data.data;
      console.log('Fetched safaris:', this.safaris);  
    });
  }
}
