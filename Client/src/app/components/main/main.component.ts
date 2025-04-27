import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent  {
  isLoggedIn: boolean = false;
  userName: string = '';
  userImage: string = 'https://www.w3schools.com/howto/img_avatar.png'; // Default image URL
  constructor(private mainService:MainService, private rotuer:Router) { 

    this.isLoggedIn = this.mainService.isLoggedIn;
    try {
      if (this.mainService.loggedInUser.user) {
        this.userName = this.mainService.loggedInUser.user.name;
      }
    } catch (error) {
      this.rotuer.navigate(['/login']);
    }
  }
  
  
  
  logout() {
    //Server logic needs to be implemented for session kill
    this.mainService.isLoggedIn = false;
    this.mainService.loggedInUser = null;
    this.mainService.hideLoading();
    this.rotuer.navigate(['/login']);
 }

}
