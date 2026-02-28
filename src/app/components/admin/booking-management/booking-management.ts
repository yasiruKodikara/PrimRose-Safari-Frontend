import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../../../core/services/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AsyncPipe, DatePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { AuthState } from '../../../core/services/auth-state';
import { Booking } from '../../../core/services/api';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-booking-management',
  imports: [NgFor,NgIf,FormsModule,DatePipe,TitleCasePipe,AsyncPipe],
  templateUrl: './booking-management.html',
  styleUrl: './booking-management.css'
})



export class BookingManagement {
  
  constructor(private api:Api,private authState:AuthState, private router:Router){}
  bookings: Booking[] = [];
  bookings$!: Observable<Booking[]>;
  

  newBooking: Booking = {
    id: 0,
    item_type: "room",
    total_amount:0,
    name:"",
    email:"",
    phone:"",
    start_date:"",
    end_date:"",
    quantity:0,
    user_id:0,
    created_at:"",
    updated_at:"",
    status:"pending"
  };

  editingId: number | null = null;
  isSubmitted: boolean = false;
  showForm: boolean = false;

  addRoom(form: NgForm) {
    this.isSubmitted = true;

    if (form.invalid) {
      return;
    }

    if (this.editingId) {
      const index = this.bookings.findIndex(r => r.id === this.editingId);
      if (index !== -1) {
        this.bookings[index] = { ...this.newBooking, id: this.editingId };
        this.api.updateRoomStatus(this.newBooking.id, this.newBooking.status).subscribe((res:any)=>{
          alert(res.message);
          
        });
      }
    } else {
      // const newId = this.newBooking.id.length > 0 ? Math.max(...this.rooms.map(r => r.id)) + 1 : 1;
      this.api.addRoom(this.newBooking).subscribe((res:any)=>{
        alert(res.message[0]);
        
      });

    }

    this.resetForm(form);
  }

  editRoom(booking:Booking) {
    this.newBooking = { ...booking };
    this.editingId = booking.id;
    this.showForm = true;
    this.isSubmitted = false;
  }

  deleteRoom(id: number) {
    this.api.deleteBooking(id).subscribe((res:any)=>{
      alert(res.message);
      this.bookings = this.bookings.filter(r => r.id !== id);
    });
  }

  resetForm(form: NgForm) {
    form.reset();
    this.newBooking = {
      id: 0,
      item_type: "room",
      total_amount:0,
      name:"",
      email:"",
      phone:"",
      start_date:"",
      end_date:"",
      quantity:0,
      user_id:0,
      created_at:"",
      updated_at:"",
      status:"pending"
    };
    this.editingId = null;
    this.isSubmitted = false;
    this.showForm = false;
  }

  cancelForm() {
    this.showForm = false;
    this.editingId = null;
    this.isSubmitted = false;
  }

  ngOnInit() {
    const userId = this.authState.currentUserValue?.id;

  
    this.bookings$ = this.api.getBookings();
    this.api.getBookings().subscribe({
      next: (res)=> {
        this.bookings = res;
        console.log(res);
      },
      error: (err)=>{
        console.log(err);
        alert(err.message);
      }
    });
  
  

}
}
