import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private baseUrl = "http://localhost:3000/api";


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
  bookSafari(bookingData:any):Observable<any>{
    
    return this.http.post(`${this.baseUrl}/book-safari-jeep`, bookingData);
  }

  //get a user
   //Tested ✅
  getUser(userId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/users/get-user-by-id/${userId}`);
  }

   //Tested ✅
  getBookingsByUserId(userId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/bookings/get-bookings-by-user/${userId}`);
  }
}
