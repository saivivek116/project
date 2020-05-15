import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from '../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  public profile;
  constructor(private auth: AuthService, private _route: ActivatedRoute,private toastr:ToastrManager) { }
  
  
  ngOnInit() {
    this.auth.checkUser();
    let name: string = localStorage.getItem('username');
    console.log(name);
    
    this.auth.getProfile(name).subscribe(data => {
      this.profile = data;
    },
      err => {
        console.log(err);
      }
    );
  }
  public updateProfile(){
    this.auth.updateProfile(this.profile).subscribe(data=>{
      console.log("succesfully updated");
      this.toastr.successToastr('Successfully Updated.', 'Success!');
    },
    err=>{
      console.log(err);
      this.toastr.errorToastr('Update unsuccessful.', 'Error!');
    });
  }


}
