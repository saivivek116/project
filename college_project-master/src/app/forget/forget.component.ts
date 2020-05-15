import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private router: Router, private authservice: AuthService, private toastr: ToastrManager) { }
  public email;
  ngOnInit() {
  }
  forgetPassword(){
    console.log(this.email);
    let emailobj={
      email:this.email
      
    }
    this.authservice.forgetPassword(emailobj).subscribe(data => {
      this.toastr.successToastr('password sent Successfully.', 'Success!');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    }, err => {
      console.log(err);
      this.toastr.errorToastr(err, 'Oops!');
    })
  }

}
