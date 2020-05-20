import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  constructor(private data: DataService, private _route: ActivatedRoute, private router: Router,private toastr: ToastrManager,private auth:AuthService) { }
  public bookmarkedBlogs;
  public _id = localStorage.getItem('_id');
  
  public username = localStorage.getItem('username');
  ngOnInit() {
    console.log(this._id,this.username);
    this.data.getBookmarkedPosts(this._id).subscribe(data => {
      this.bookmarkedBlogs=data;
      console.log(this.bookmarkedBlogs);
    },
      err => {
        console.log(err);

      }
    );
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
  public removeBookmark(blogId)
  {
    let book={
      username:this.username,
      blogId:blogId
    }
    this.auth.deleteBookmark(book).subscribe(data=>{
      this.toastr.successToastr('This is success toast.', 'Success!');
      console.log(data);
    },error=>{
      console.log(error);
        this.toastr.errorToastr('This is error toast.', 'Oops!');
    })
  }

}
