import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  public blogTitle: string;
  public blogBodyHtml: string;
  public blogbranch: string;
  public branches = ["cse","ece",'cee',"mech","other"];
  public blogDescription: string;
  public tags:string;
  public username= localStorage.getItem('username');


  constructor(public data:DataService, private _route: ActivatedRoute, private router: Router, public toastr: ToastrManager, vcr: ViewContainerRef,private auth:AuthService) {
    // this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.auth.checkUser();
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
  public createBlog(): any {
    let blog;
    let blogData = {
      title: this.blogTitle,
      description: this.blogDescription,
      blogBody: this.blogBodyHtml,
      branch: this.blogbranch,
      tags:this.tags,
      username:localStorage.getItem('username'),
      _id:localStorage.getItem('_id')
    }
    this.data.createPost(blogData).subscribe(
      data => {
        console.log("created succesfully");
        console.log(data);
        blog=data;
        this.toastr.successToastr('This is success toast.', 'Success!');
        setTimeout(() => {
          this.router.navigate(['/read',blog.blogId]);
        }, 1000);
      },
      error => {
        console.log("error occured");
        console.log(error.errorMessage);
        this.toastr.errorToastr('This is error toast.', 'Oops!');
      }
    );
  }

}
