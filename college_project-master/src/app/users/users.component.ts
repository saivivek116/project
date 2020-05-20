import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import {FormControl} from '@angular/forms';
import { ɵAnimationGroupPlayer } from '@angular/animations';
// import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private auth:AuthService, private _route: ActivatedRoute, private router: Router, private toastr: ToastrManager ) { }
  public allusers;
  public items;
  public pageOfItems:Array<any>;
  public UserName:string;
  public Users;
  public isAdmin=false;
  ngOnInit() {
    this.UserName=localStorage.getItem('username');
    
    if(this.UserName=='Admin')
      this.isAdmin=true;
    console.log(this.UserName,this.isAdmin);
    this.auth.getAllUsers().subscribe(
      data=>{
        this.allusers =data;
        this.allusers.reverse();
        this.items = this.allusers;
      },
      err=>{
        console.log(err);
      });
  }
  // public allUsers(){
  //   this.router.navigate(['/']);
  //   this.items=this.allusers;
  // }
  public complete(FUserName:string){
    this.Users=[];
    this.items.forEach(element => {
      if(element.userName.toLowerCase().indexOf(FUserName.toLowerCase())>=0){
        this.Users[this.Users.length]=element;
      }
    });
  }
  public globalPosts() {
    this.router.navigate(['/dashboard']);
  }
  public signOutFunction() {
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
  public deleteUser(username){
    console.log(username);
    this.auth.deleteUser(username).subscribe(data=>{
      this.toastr.successToastr('Successfully deleted.', 'Success!');
      setTimeout(() => {
        this.router.navigate(['/users']);
      }, 1000);
    },
    err=>{
      this.toastr.errorToastr(err, 'Oops!');
      console.log(err);
    });
  }
}