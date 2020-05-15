import { Component, OnInit } from '@angular/core';
// import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
 
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private router: Router,private authservice:AuthService,private toastr:ToastrManager) { }
  public email;
  public password;
  public gridRadios;
  public branch;
  public userName;
  public otp;
  public bio;
  // private visible=false;
  ngOnInit() {
  }
  public register(){
    console.log(this.email,this.password,this.gridRadios,this.branch,this.userName);
    let obj = {
      userName: this.userName,
      email:this.email,
      password:this.password,
      gridRadios:this.gridRadios,
      branch:this.branch,
      bio:this.bio
    }
    this.authservice.signup(obj).subscribe(
      data=>{
        console.log(data);
        this.toastr.successToastr('Successfully Registered.', 'Success!');
        this.getOtp();
        setTimeout(() => {
          this.router.navigate(['/otp']);
        }, 1000);
      },
      err=>{
        this.toastr.errorToastr('username already exist.', 'Oops!');
         console.log(err);
      }
    );
   
 }
  
  private getOtp() {
    
    this.authservice.getOtp(this.email).subscribe(data => {
      this.toastr.successToastr('OTP sent to your email Successfully.', 'Success!');
    }, err => {
      this.toastr.errorToastr('Failed to send OTP.', 'Oops!');
    })
    
  }
}
