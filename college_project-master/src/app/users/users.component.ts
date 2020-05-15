import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
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
  public isAdmin=false;
  ngOnInit() {
    if(localStorage.getItem('username')=='Admin')
    {
      this.isAdmin=true;
    }
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
