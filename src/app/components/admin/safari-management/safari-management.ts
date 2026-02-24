import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../../../core/services/api';

interface Safari {
  id: number;
  name: string;
  price_per_trip: number;
  max_passengers: number;
  driver_included: boolean;
  imageUrl: string;
  status: string;
}

@Component({
  selector: 'app-safari-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './safari-management.html',
  styleUrls: ['./safari-management.css'],

})
export class SafariManagementComponent {
  constructor(private api: Api) {}
  safaris: Safari[] = [];

  newSafari: Safari = {
    id: 0,
    name: '',
    price_per_trip: 0,
    max_passengers: 1,
    driver_included: true,
    imageUrl: '',
    status: 'available'
  };

  editingId: number | null = null;
  isSubmitted: boolean = false;
  showForm: boolean = false;

  addSafari(form: NgForm) {
    this.isSubmitted = true;

    if (form.invalid) {
      return;
    }

    if (this.editingId) {
      const index = this.safaris.findIndex(s => s.id === this.editingId);
      this.api.updateSafari(this.editingId, this.newSafari).subscribe((res:any)=>{
          alert(res.message);
        });
      if (index !== -1) {
        this.safaris[index] = { ...this.newSafari, id: this.editingId };
        
      }
    } else {
      const newId = this.safaris.length > 0 ? Math.max(...this.safaris.map(s => s.id)) + 1 : 1;
      this.safaris.push({ ...this.newSafari, id: newId });
      this.api.addSafariJeep(this.newSafari).subscribe((res:any)=>{
        alert(res.message);
        
      });
    }

    this.resetForm(form);
  }

  editSafari(safari: Safari) {
    this.newSafari = { ...safari };
    this.editingId = safari.id;
    this.showForm = true;
    this.isSubmitted = false;
  }

  deleteSafari(id: number) {
    this.safaris = this.safaris.filter(s => s.id !== id);
    this.api.deleteSafariJeep(id).subscribe({
      next:(res:any)=>{
        alert(res.message);
      },
      error:(err:any)=>{
        console.error('Error deleting safari:', err);
      }
    })
  }

  resetForm(form: NgForm) {
    form.reset();
    this.newSafari = {
      id: 0,
      name: '',
      price_per_trip: 0,
      max_passengers: 1,
      driver_included: true,
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
    this.api.getSafariJeeps().subscribe((data: any) => {
      this.safaris = data.data;
      console.log('Fetched safaris:', this.safaris);  
    });
  }
}
