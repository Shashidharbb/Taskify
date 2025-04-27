import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService implements OnDestroy {

   baseUrl = "";
   private SpinnerLoading = new BehaviorSubject(false);
  public  SpinnerLoading$ = this.SpinnerLoading.asObservable();

  loggedInUser: any = null;
  isLoggedIn: boolean = false;
  constructor(private http:HttpClient, private router :Router) { 
    this.baseUrl= environment.baseurl;
  }

  showLoading(){
    this.SpinnerLoading.next(true);

  }

  hideLoading(){
    this.SpinnerLoading.next(false);
  }


  sendPostRequest(url: string, requestBody: any, headers: any) {
    if(headers) {
      return this.http.post(this.baseUrl + url, requestBody, headers)
    }else {
      return this.http.post(this.baseUrl + url, requestBody);
    }
  }
    sendPutRequest(url: string, requestBody: any, headers: any) {
      if(headers) {
        return this.http.post(this.baseUrl + url, requestBody, headers);
      }else {
        return this.http.post(this.baseUrl + url, requestBody);
      }  
    }

    sendGetRequest(url: string, headers: any) {
      if(headers) {
        return this.http.get(this.baseUrl + url, headers);
      }else {
        return this.http.get(url);
      }  
    }
   
    validateEmail(email: string):boolean {
      if(!email) return false;
     const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return emailRegex.test(email.trim());
    }

    validatePassword(password: string): boolean {
      if (!password) {
          return false;
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      return passwordRegex.test(password);
  }
  
  getHttpHeaders() {
    let options: any | undefined;
    if (this.loggedInUser && this.loggedInUser.user) {
    let addheaders =  new HttpHeaders();
      addheaders = addheaders.set('Content-Type', 'application/json');
      addheaders = addheaders.set('Accept', 'application/json');
      addheaders = addheaders.set('Authorization', 'Bearer ' + this.loggedInUser.Authorization);
      options = {
        headers: addheaders,
        observe: 'response' as 'body'
      };
    }
    return options;
  }

  generateUniqueId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  ngOnDestroy(): void {
    this.loggedInUser = null;
    this.isLoggedIn = false;
  }
}
