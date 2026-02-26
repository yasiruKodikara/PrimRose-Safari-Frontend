import { Component } from '@angular/core';


interface Booking  {
  
}

@Component({
  selector: 'app-booking-management',
  imports: [],
  templateUrl: './booking-management.html',
  styleUrl: './booking-management.css',
})



export class BookingManagement {
  
  constructor(private api:Api){}
  bookings: Booking[] = [];

  newRoom: Booking = {
    id: 0,
    room_number: '',
    type: 'Single',
    price_per_night: 0,
    capacity: 1,
    imageUrl: '',
    status: 'available'
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
      const index = this.rooms.findIndex(r => r.id === this.editingId);
      if (index !== -1) {
        this.rooms[index] = { ...this.newRoom, id: this.editingId };
        this.api.updateRoomStatus(this.newRoom.id, this.newRoom.status).subscribe((res:any)=>{
          alert(res.message);
          
        });
      }
    } else {
      const newId = this.rooms.length > 0 ? Math.max(...this.rooms.map(r => r.id)) + 1 : 1;
      this.api.addRoom(this.newRoom).subscribe((res:any)=>{
        alert(res.message[0]);
        
      });

    }

    this.resetForm(form);
  }

  editRoom(room: Room) {
    this.newRoom = { ...room };
    this.editingId = room.id;
    this.showForm = true;
    this.isSubmitted = false;
  }

  deleteRoom(id: number) {
    this.api.deleteRoom(id).subscribe((res:any)=>{
      alert(res.message[0]);
      this.rooms = this.rooms.filter(r => r.id !== id);
    });
  }

  resetForm(form: NgForm) {
    form.reset();
    this.newRoom = {
      id: 0,
      room_number: '',
      type: 'Single',
      price_per_night: 0,
      capacity: 1,
      imageUrl: '',
      status: 'available'
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
    this.api.getRooms().subscribe((data:any)=>{
      this.rooms=data;
    });
  }

}
