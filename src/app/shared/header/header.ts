import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthState } from '../../core/services/auth-state';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(private authState:AuthState){}
  
  isMenuOpen: boolean = false;

  // Optional: A function to close the menu when a link is clicked
  closeMenu() {
    this.isMenuOpen = false;
  }
  isLoggedIn():boolean{
    // This is a great place to check if the user is already logged in when the app starts.
    // If they are, we can set our AuthState accordingly so the rest of the app knows about it.
    if(this.authState.currentUserValue){
      return true;
    }else{
      return false;
    }
  }

  myAccount(){
    
    window.location.href = '/my-account';
    
  }
  

  
}
