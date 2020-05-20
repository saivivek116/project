import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { from } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  public currentPost;
  public comment;
  public allComments;
  public username= localStorage.getItem('username');
  public testadmin=false;
  public bookmarked:boolean=false;
  public isOwn=false;
  public bookmarks:any[];
  public profile;
  constructor(private _route: ActivatedRoute, private router: Router, private data: DataService, private toastr: ToastrManager, private auth: AuthService) { }

  ngOnInit() {
    this.auth.getProfile(this.username).subscribe(data=>{
      this.profile=data;
      this.bookmarks=this.profile.bookmarks;
      console.log(this.bookmarks);
      console.log(this.bookmarked);
    this.auth.checkUser();
    console.log("these are bookmarks");
    console.log(this.bookmarks);
    
    if(localStorage.getItem('_id')=='S7xHNG9MS')
    {
      this.testadmin=true;
    }
    let id:String=this._route.snapshot.paramMap.get("blogId");
    console.log(this.bookmarks.length);
    for(let i=0;i<this.bookmarks.length;i++)
    {
      console.log(id.localeCompare(this.bookmarks[i]));
      console.log(this.bookmarks[i]);
      if(id.localeCompare(this.bookmarks[i])==0)
      {
        console.log("blogid match");
        this.bookmarked=true;
      }
    }
    console.log("this is ", id);
    this.data.getApost(id).subscribe(data=>{
      console.log(data);
      this.currentPost=data;
      if (localStorage.getItem('_id') == this.currentPost.userId) {
        // console.log("matched")
        this.isOwn = true;
      }
    },err=>{
      console.log("error");
      console.log(err);
    });
    },err=>{
        console.log(err);
    });
    
    
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
  public createComment(){
    let obj ={
      comment:this.comment,
      blogId:this.currentPost.blogId,
      username:localStorage.getItem('username')
    }
    this.data.newComment(obj).subscribe(data=>{
      console.log(data);
      this.toastr.successToastr('Successfully posted your comment.', 'Success!');
    },err=>{
        this.toastr.errorToastr('error in posting comment.', 'Oops!');
      console.log(err);
    });
  }
  public showComments(){
this.data.getAllComments(this.currentPost.blogId).subscribe(data => {
      console.log(data);
      this.allComments = data;
      this.allComments.reverse();
    }, err => {
      console.log(err);
    });
  }
  public blogDelete(blogId){
    this.data.deleteBlog(blogId).subscribe(data=>{
      console.log("Successfully deleted");
      this.router.navigate(['/dashboard']);
    },err=>
    {
      console.log(err)
    })
  }

  public addToBookmarks(blogId){
    this.bookmarked=true;
    let blogObj={
      email:localStorage.getItem('email'),
      blogId:blogId
    }
    this.auth.addBookmarks(blogObj).subscribe(data=>{
      console.log("added to bookmarks");
      this.toastr.successToastr('Added to Bookmarks', 'Success!');
    },err=>{
        this.toastr.errorToastr('Error in adding bookmarks.', 'Oops!');
        console.log(err);
    })
  }

  public removeBookmark(blogId)
  {
    this.bookmarked=false;
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
