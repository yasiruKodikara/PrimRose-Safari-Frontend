import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleManagement } from './vehicle-management/vehicle-management';
import { RoomManagementComponent } from './room-management/room-management';
import { SafariManagementComponent } from './safari-management/safari-management';
import { AuthState } from '../../core/services/auth-state';
import { Api } from '../../core/services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    VehicleManagement,
    RoomManagementComponent,
    SafariManagementComponent
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  constructor(private api:Api, private router: Router, private authState: AuthState){}
  activeTab: string = 'vehicles';

  setActiveTab(tab: string) {
    this.activeTab = tab;
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
}
