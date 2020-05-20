import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private router: Router,private authservice:AuthService,private toastr:ToastrManager) { }
  public username;
  public password;
  private profile;
  ngOnInit() {
    let userName = localStorage.getItem('username');
    let passWord = localStorage.getItem('password');
    if(userName && passWord){
      // this.authservice.access = true;
        this.router.navigate(['/dashboard']);
    }
  }
  public login(){
    this.authservice.check(this.username, this.password).subscribe(
      val => {
        console.log(val);
        localStorage.setItem('username',this.username);
        localStorage.setItem('password', this.password);
        //calling profileservice for getting profile data
        this.authservice.getProfile(this.username).subscribe(data=>{
          this.profile=data;
          localStorage.setItem('_id',this.profile._id );
          localStorage.setItem('email', this.profile.email);
          localStorage.setItem('work', this.profile.work);
          localStorage.setItem('branch', this.profile.branch);
          localStorage.setItem('bio',this.profile.bio);
          localStorage.setItem('bookmarks',this.profile.bookmarks);
          console.log("data acquired");
        },err=>{
            console.log(err);
        });
        this.toastr.successToastr('Login Successfull!');
        // this.authservice.access = true;
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
        console.log(this.username, this.password);
      },
      
      err=>{
        console.log(err);
        this.toastr.errorToastr('Login Unsuccessful', 'Oops!');
      }
    );
    // if(this.authservice.access==true){     
    //   console.log(this.username, this.password);
    // }
}

}
