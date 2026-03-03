import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface Booking {
  id: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'refunded'; // Using union types for better type safety
  item_type: 'room' | 'safari' | 'vehicle'; // Specific types based on your project
  
  // Financials
  total_amount: string | number; // APIs often return decimals as strings to preserve precision
  
  // Guest Information
  name: string;
  email: string;
  phone: string;
  
  // Reservation Details
  start_date: string | Date;
  end_date: string | Date;
  quantity: number;
  
  // Metadata
  user_id?: number; // Optional if the guest is a "guest" and not a registered user
  created_at: string | Date;
  updated_at?: string | Date;
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  

  private baseUrl = 'https://primrose-safari-backend-production.up.railway.app/api';


  constructor(private http:HttpClient){}

  

  // Inside api.ts class
  //Tested✅
  getAuthStatus(): Observable<any> {
    // Assuming you routed this in Express as /api/auth/me
    return this.http.get(`${this.baseUrl}/auth/me`); 
  }

  //Tested✅
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/logout`,{});
  }

  //Tested✅
  registerUser(userData: {name:string, email:string, password:string, phone:string}):Observable<any>{
    
    return this.http.post(`${this.baseUrl}/auth/register`, userData);

  }

  //Tested✅
  login(loginData: {phone:string, password:string}):Observable<any>{
    
    return this.http.post(`${this.baseUrl}/auth/login`, loginData);
  }

  //get rooms
  //Tested✅
  getRooms():Observable<any>{
    return this.http.get(`${this.baseUrl}/rooms/get-rooms`);
  }

  //get vehicles
  //Tested✅
  getVehicles():Observable<any>{
    return this.http.get(`${this.baseUrl}/vehicles/get-vehicles`);
  }
  //get safari jeeps
  //Tested✅
  getSafariJeeps():Observable<any>{
    return this.http.get(`${this.baseUrl}/safaris/get-safaris`);
  }

  //add room
  //Tested ✅
  addRoom(roomData:any):Observable<any>{
    
    return this.http.post(`${this.baseUrl}/rooms/add-room`, roomData);
  }
  //add vehicle
   //Tested ✅
  addVehicle(vehicleData:any):Observable<any>{
   
    return this.http.post(`${this.baseUrl}/vehicles/add-vehicle`, vehicleData);
  }
  //add safari jeep
  //Tested✅
  addSafariJeep(safariData:any):Observable<any>{
    
    return this.http.post(`${this.baseUrl}/safaris/add-safari`, safariData);
  }

  //delete vehicle
   //Tested ✅
  deleteVehicle(vehicleId:number):Observable<any>{

    return this.http.delete(`${this.baseUrl}/vehicles/delete-vehicle/${vehicleId}`);
  }

  //delete safari jeep
  //Tested✅
  deleteSafariJeep(safariId:number):Observable<any>{
    
    return this.http.delete(`${this.baseUrl}/safaris/delete-safari-jeep/${safariId}`);
  }

  //delete room
   //Tested ✅
  deleteRoom(roomId:number):Observable<any>{
    
    return this.http.delete(`${this.baseUrl}/rooms/delete-room/${roomId}`);
  }
  //update room status
   //Tested ✅
  updateRoomStatus(roomId:number, status:string):Observable<any>{
    
    return this.http.patch(`${this.baseUrl}/rooms/update-room-status/${roomId}`, {status});
  }

  //update room 
   //Tested ✅
  updateRoom(roomId:number, data:any):Observable<any>{
    
    return this.http.put(`${this.baseUrl}/rooms/update-room/${roomId}`, {data});
  }
  
  //update vehicle status
  //Tested ✅
  updateVehicleStatus(vehicleId:number, status:string):Observable<any>{
    
    return this.http.patch(`${this.baseUrl}/vehicles/update-vehicle/${vehicleId}`, {status});
  }

  //update safari status
  //Tested✅
  updateSafari(safariId:number, safariData:any):Observable<any>{
    
    return this.http.put(`${this.baseUrl}/safaris/update-safari/${safariId}`, safariData);
  }

  //roomBooking
  //Tested ✅
  bookRoom(bookingData:any):Observable<any>{
    
    return this.http.post(`${this.baseUrl}/bookings/room`, bookingData);
  }

  //safariBooking
  //Tested ✅
  bookSafari(bookingData:any):Observable<any>{
    
    return this.http.post(`${this.baseUrl}/bookings/safari`, bookingData);
  }

  bookVehicle(bookingData:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/bookings/vehicle`, bookingData);
  }

  //get a user
   //Tested ✅
  getUser(userId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/users/get-user-by-id/${userId}`);
  }

   //Tested ✅
  getBookingsByUserId(userId:number):Observable<Booking[]>{
    return this.http.get<Booking[]>(`${this.baseUrl}/bookings/get-bookings-by-user/${userId}`);
  }
  //Tested ✅
  getBookingCountByUser(userId:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/bookings/get-booking-count-by-user/${userId}`);
  }

  //Tested ✅
  getBookings():Observable<Booking[]>{
    return this.http.get<Booking[]>(`${this.baseUrl}/bookings/get-bookings`);
    }

  //DELETE a booking
  //Tested ✅
  deleteBooking(bookingId:number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/bookings/delete-booking/${bookingId}`);
  }
  
  //UPDATE booking status
  //Tested ✅
  setBookingStatus(bookingId: number,status:any):Observable<any> {
    return this.http.patch(`${this.baseUrl}/bookings/update-booking-status/${bookingId}`,status);
  }
  
  //GET total_amount for user
  getTotalAmountForUser(userId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/bookings/get-total-amount-for-user/${userId}`);
  }

}
