import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profile;
  public userBlogs;
  public username= localStorage.getItem('username');
  public isOwn=false;
  constructor(private data: DataService, private _route: ActivatedRoute, private router: Router,private auth:AuthService) { }
  ngOnInit() {
    this.auth.checkUser();
    let name: string = this._route.snapshot.paramMap.get('username');
    console.log(name);
    if(name === localStorage.getItem('username')){
      this.isOwn=true;
      this.profile={
        userName: localStorage.getItem('username'),
        branch: localStorage.getItem('branch'),
        work: localStorage.getItem('work'),
        email: localStorage.getItem('email'),
        _id: localStorage.getItem('_id'),
        bio:localStorage.getItem('bio')
      }
      console.log("user posts")
      console.log(this.profile);
      this.data.getUserPosts(this.profile._id).subscribe(data => {
        console.log(data);
        this.userBlogs = data;
        this.userBlogs.reverse();
      },
      err => {
        console.log(err);
        
      }
      );
    }
    else{
      // this.router.navigate(["/dashboard"]);
      this.auth.getProfile(name).subscribe(data=>{
        this.profile=data;
        this.data.getUserPosts(this.profile._id).subscribe(data => {
          console.log(data);
          this.userBlogs = data;
          this.userBlogs.reverse();
        },
        err => {
          console.log(err);
          
        }
        );
      },
      err=>{
        console.log(err);
      }
      );
      

    }
  }
  public globalPosts(){
    this.router.navigate(['/dashboard']);
  }
  public signOutFunction(){
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
  
  
}
