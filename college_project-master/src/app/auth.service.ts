import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { from } from 'rxjs';
import { Observable, throwError } from "rxjs";
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //public access=false;
  private baseUrl ='http://localhost:3000/user';
  constructor(private _http: HttpClient, public toastr: ToastrManager, private router: Router) { 
    console.log('service called');
  }
  public checkUser(){
    let userName = localStorage.getItem('username');
    let passWord = localStorage.getItem('password');
    if(userName && passWord){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  public signup(obj){
    return this._http.post(`${this.baseUrl}/register`, obj /*,{ responseType: 'text' }*/);
  }
  public check(username,password){
    let obj={
      userName:username,
      password:password
    };
    return this._http.post(`${this.baseUrl}/login`, obj, { responseType: 'text' });
  }
  forgetPassword(emailobj) {
    return this._http.post(`${this.baseUrl}/forgetPassword`,emailobj);
  }
  public getProfile(username){
    return this._http.get(`${this.baseUrl}/profile/${username}`);
  }
  public checkOtp(emailobj){
    console.log(emailobj);
    return this._http.post(`${this.baseUrl}/verifyotp`,emailobj);
  }
  public getOtp(email){
    return this._http.post(`${this.baseUrl}/getotp`,{email:email});
  }
  public deleteUser(username){
    console.log(username);
    return this._http.post(`${this.baseUrl}/deleteUser/${username}`,{});
  }
  /*public isUserAuthenticated():boolean{
    console.log(this.access);
    if(this.access==true)
      return true;
    else
      return false;

  }*/
  ngOnInit(){
  }
  private handleError(err: HttpErrorResponse) {
    console.log("handle http errors");
    console.log(err.message);
    return Observable.throw(err.message);
  }
  public updateProfile(profile){
    return this._http.put(`${this.baseUrl}/updateProfile`,profile);
  }
  public addBookmarks(blogobj){
    return this._http.post(`${this.baseUrl}/addToBookmarks`,blogobj);
  }
  public getAllUsers(){
    return this._http.get(`${this.baseUrl}/allUsers`);
  }
}
