import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



//Define the shape ofyour user based on your Express backend
export interface User {
  id: number;
  name: string;
  role: string; // e.g., 'admin' or 'user'
}

@Injectable({
  providedIn: 'root',
})

export class AuthState {
  // The BehaviorSubject holds the current user. It starts as 'null' (not logged in).
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  // Components will subscribe to this observable to listen for changes
  public currentUser$ = this.currentUserSubject.asObservable();

  // Call this when the user logs in, logs out, or is verified via the /me endpoint
  setCurrentUser(user: User | null) {
    this.currentUserSubject.next(user);
  }

  // A quick way to get the current user value without subscribing (useful for Route Guards)
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

}
