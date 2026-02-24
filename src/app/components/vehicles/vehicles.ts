import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../../core/services/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';

declare const bootstrap: any;

interface Vehicle{
  id:number;
  model:string;
  type:string;
  price_per_day:number;
  status:string;
  imageUrl:string;
}

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './vehicles.html',
  styleUrls: ['./vehicles.css'],
 
})
export class Vehicles implements OnInit{

  constructor(private api:Api){
  }

  vehicles: Vehicle[] = [
    // {
    //   id: 1,
    //   name: 'Land Cruiser',
    //   price: '$79/day',
    //   image: 'https://images.unsplash.com/photo-1609708536965-59ee526918cb?auto=format&fit=crop&w=500&q=60',
    //   description: 'Powerful 4x4 for off-road adventures',
    //   specs: ['7-seater', 'AC', 'GPS']
    // },
    // {
    //   id: 2,
    //   name: 'Safari Jeep',
    //   price: '$59/day',
    //   image: 'https://images.unsplash.com/photo-1605559424843-9e4c3febda46?auto=format&fit=crop&w=500&q=60',
    //   description: 'Classic jeep for safari experiences',
    //   specs: ['5-seater', 'Open-top', 'Sturdy']
    // },
    // {
    //   id: 3,
    //   name: 'Toyota Fortuner',
    //   price: '$89/day',
    //   image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=500&q=60',
    //   description: 'Spacious SUV for family trips',
    //   specs: ['7-seater', 'Leather seats', 'Premium']
    // },
    // {
    //   id: 4,
    //   name: 'Mahindra XUV',
    //   price: '$49/day',
    //   image: 'https://images.unsplash.com/photo-1606110832868-bac9b3c0c901?auto=format&fit=crop&w=500&q=60',
    //   description: 'Budget-friendly SUV with comfort',
    //   specs: ['5-seater', 'AC', 'Compact']
    // },
    // {
    //   id: 5,
    //   name: 'Toyota Innova',
    //   price: '$69/day',
    //   image: 'https://images.unsplash.com/photo-1612353657095-d16662ec4437?auto=format&fit=crop&w=500&q=60',
    //   description: 'Comfortable vehicle for long drives',
    //   specs: ['8-seater', 'AUX cable', 'Reliable']
    // },
    // {
    //   id: 6,
    //   name: 'Hyundai Creta',
    //   price: '$54/day',
    //   image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&w=500&q=60',
    //   description: 'Modern SUV with latest features',
    //   specs: ['5-seater', 'Touchscreen', 'Stylish']
    // },
    // {
    //   id: 7,
    //   name: 'Thar Jeep',
    //   price: '$64/day',
    //   image: 'https://images.unsplash.com/photo-1605559424843-9e4c3febda46?auto=format&fit=crop&w=500&q=60',
    //   description: 'Legendary off-roader',
    //   specs: ['4-seater', 'Manual', 'Rugged']
    // },
    // {
    //   id: 8,
    //   name: 'Mercedes Sprinter',
    //   price: '$99/day',
    //   image: 'https://images.unsplash.com/photo-1581274455760-a1ea1f68ff39?auto=format&fit=crop&w=500&q=60',
    //   description: 'Luxury van for group travel',
    //   specs: ['12-seater', 'Premium', 'Spacious']
    // }
  ];

  


  // Booking state
  selectedVehicle: any = null;
  booking: { start_date: string; end_date: string; quantity: number } = { start_date: '', end_date: '', quantity: 1 };
  isBookingSubmitted: boolean = false;

  ngOnInit(): void {
    this.api.getVehicles().subscribe({
      next:(data)=>{
        this.vehicles = data.data;

      },
      error:(err)=>{
        console.error('Error fetching vehicles:', err);

      }
    })
  }

  openBooking(vehicle: any) {
    this.selectedVehicle = vehicle;
    this.booking = { start_date: '', end_date: '', quantity: 1 };
    this.isBookingSubmitted = false;
  }

  submitBooking(form: NgForm) {
    this.isBookingSubmitted = true;
    if (form.valid) {
      console.log('Vehicle booking confirmed for', this.selectedVehicle?.name, this.booking);
      alert(`Booking confirmed for ${this.selectedVehicle?.name} (${this.booking.quantity})`);
      const modalEl = document.getElementById('vehicleBookingModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      }
    }
  }

  shopMore(vehicle: any) {
    console.log('Shop more details:', vehicle.name);
    alert(`Details for: ${vehicle.name}`);
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
    if (!this.selectedVehicle) return 0;
    const days = this.getBookingDays();
    const price = this.parsePrice(this.selectedVehicle.price);
    const qty = this.booking.quantity || 1;
    return price * days * qty;
  }
}
