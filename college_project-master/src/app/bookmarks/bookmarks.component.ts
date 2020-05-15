import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  constructor(private data: DataService, private _route: ActivatedRoute, private router: Router) { }
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

}
