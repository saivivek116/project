import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OtpverificationComponent implements OnInit {
  
  public otp;
  public email;
  constructor(private _route: ActivatedRoute, private router: Router, private authservice: AuthService, private toastr: ToastrManager) { }

  ngOnInit() {
  }
  public verifyOtp() {
    console.log(this.otp,this.email);
    let emailobj={
      email:this.email,
      otp:this.otp
    }
    this.authservice.checkOtp(emailobj).subscribe(data => {
      this.toastr.successToastr('OTP Verified Successfully.', 'Success!');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    }, err => {
      console.log(err);
      this.toastr.errorToastr('OTP Verification Failed.', 'Oops!');
    })
  }

}
