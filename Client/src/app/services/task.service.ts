import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = "";
  
  constructor(private http:HttpClient, private router :Router) { 
      this.baseUrl= environment.baseurl;
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
        return this.http.put(this.baseUrl + url, requestBody, headers);
      }else {
        return this.http.put(this.baseUrl + url, requestBody);
      }  
    }

    sendGetRequest(url: string, headers: any) {
      if(headers) {
        return this.http.get(this.baseUrl + url, headers);
      }else {
        return this.http.get(url);
      }  
    }

    sendDeleteRequest(url: any, headers: any, requestBody: any) {
      if(headers) {
        return this.http.delete(this.baseUrl + url,  headers);
      } else {
        return this.http.delete(this.baseUrl + url,  requestBody);
      } 
    }

  

}
