import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  
  constructor(private fb: FormBuilder, private mainService: MainService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      let user = this.loginForm.value;
      if(!this.mainService.validateEmail(user.email)){
        alert("Invalid Email Address");
        return;
      }
      if(!this.mainService.validatePassword(user.password)){
        alert("Invalid Password");
        return;
      }
      if(this.mainService.validateEmail(user.email) && this.mainService.validatePassword(user.password)) {
        this.mainService.showLoading();
        let addheaders =  new HttpHeaders();
        addheaders = addheaders.set('Content-Type', 'application/json');
        addheaders = addheaders.set('Accept', 'application/json');

        let requestBody = {
          email: user.email,  password: user.password
        };
        let options = {
          headers: addheaders ,
          observe: 'response' as 'body'
        };
        this.mainService.sendPostRequest( 'user/login/', requestBody, options).subscribe({
          next: (response:any) => {
            console.log('Login Response:', response);
            this.mainService.hideLoading();
            let responseBody = response.body;
            
            if(response.status == 200) {
              this.mainService.loggedInUser = responseBody.user;
              this.mainService.isLoggedIn = true;
              this.router.navigate(['/main']);
              
            }else {
              alert("Login Failed");
            }
          },
          error: (error:any) => {
            console.error('Login Error:', error);
            this.mainService.hideLoading();
            alert("Login Failed");
          }
        });
      }
    }
  }


}
