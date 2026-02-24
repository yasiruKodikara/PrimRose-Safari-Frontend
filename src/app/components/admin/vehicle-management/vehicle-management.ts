import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../../../core/services/api';
import { Vehicle } from '../../../models/vehicle';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-vehicle-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle-management.html',
  styleUrls: ['./vehicle-management.css'],

})
export class VehicleManagement {
  constructor(private api: Api) {}
  vehicles: Vehicle[] = [];

  newVehicle: Vehicle = {
    model: '',
    type: 'SUV',
    price_per_day: 0,
    imageUrl: '',
    status: 'available'
  };

  editingId: number | null = null;
  isSubmitted: boolean = false;
  showForm: boolean = false;

  addVehicle(form: NgForm) {
    this.isSubmitted = true;
    if (form.valid) {
      if (this.editingId) {
        // Update vehicle
        const vehicle = this.vehicles.find(v => v.id === this.editingId);
        this.api.updateVehicleStatus(this.editingId, this.newVehicle.status).subscribe((res:any)=>{
          alert(res.message);
        });
        if (vehicle) {
          Object.assign(vehicle, this.newVehicle);
        }
        this.editingId = null;
      } else {
        // Add new vehicle
        this.vehicles.push({ ...this.newVehicle, id: this.vehicles.length > 0 ? Math.max(...this.vehicles.map(v => v.id ?? 0)) + 1 : 1 });
        this.api.addVehicle(this.newVehicle).subscribe((res:any)=>{
          alert(res.message); 
        });
      }
      this.resetForm(form);
      this.showForm = false;
    }
  }

  editVehicle(vehicle: Vehicle) {
    this.editingId = vehicle.id ?? null;
    this.newVehicle = { ...vehicle };
    this.showForm = true;
    this.isSubmitted = false;
  }

  deleteVehicle(id?: number) {
    if (id == null) return;
    this.vehicles = this.vehicles.filter(v => v.id !== id);
    this.api.deleteVehicle(id).subscribe((res:any)=>{
      alert(res.message);
    })
  }

  resetForm(form: NgForm) {
    this.newVehicle = { model: '', type: 'SUV', price_per_day: 0, imageUrl: '', status: 'available' };
    form.resetForm();
    this.isSubmitted = false;
  }

  cancelForm() {
    this.showForm = false;
    this.editingId = null;
  }

  ngOnInit() {
    this.api.getVehicles().subscribe((res:any)=>{
      this.vehicles = res.data;
    })
  }
}
