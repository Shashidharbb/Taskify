import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { count } from 'rxjs';
import { MainService } from '../../services/main.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private mainService: MainService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Signup Data:', this.signupForm.value);

     

      if(!this.mainService.validateEmail(this.signupForm.value.email)){
        alert("Invalid Email Address");
        return;
      }
      if(!this.mainService.validatePassword(this.signupForm.value.password)){
        alert("Invalid Password");
        return;
      }
      if(this.signupForm.value.name.trim().length < 3) {
        alert("Name should be at least 3 characters long");
        return;
      }
      if(this.signupForm.value.country.trim().length < 3) {
        alert("country should be at least 3 characters long");
        return;
      }
      if(this.mainService.validateEmail(this.signupForm.value.email) && this.mainService.validatePassword(this.signupForm.value.password) && this.signupForm.value.name.trim().length >= 3) {
        this.mainService.showLoading();
        let addheaders =  new HttpHeaders();
        addheaders = addheaders.set('Content-Type', 'application/json');
        addheaders = addheaders.set('Accept', 'application/json');

        let requestBody = {
          name: this.signupForm.value.name,
          email: this.signupForm.value.email,
          password: this.signupForm.value.password,
          country: this.signupForm.value.country
        };
        let options = {
          headers: addheaders ,
          observe: 'response' as 'body'
        };
        this.mainService.sendPostRequest( 'user/signup', requestBody, options).subscribe({
          next: (response:any) => {
            console.log('Signup Response:', response);
            this.mainService.hideLoading();
            let responseBody = response.body;
            
            if(response.status == 201) {
              alert("Signup Successful");
              this.router.navigate(['/login']);
            }else {
              alert("Signup Failed");
            }
          },
          error: (error) => {
            console.error('Error:', error);
            this.mainService.hideLoading();
            alert("Signup Failed"+ error.error.message);
          }
        });
      }
    }
  }
}