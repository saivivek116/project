import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataService } from '../data.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  public currentBlog;
  public branches = ["cse", "ece", 'cee', "mech", "other"];
  constructor(private _route: ActivatedRoute, private router: Router, private toastr: ToastrManager,private data: DataService) { }

  ngOnInit() {
    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);
    this.data.getApost(myBlogId).subscribe(
      data => {
        this.currentBlog = data;
        console.log("current blog is");
        console.log(this.currentBlog);
      },
      error => {
        console.log("error occured");
        console.log(error.errorMessage);

      }
    );

  }
  public editThisBlog(): any {
    this.data.blogEdit(this.currentBlog.blogId, this.currentBlog).subscribe(
      data => {
        console.log(data);
        this.toastr.successToastr('This is success toast.', 'Success!');
        setTimeout(() => {
          this.router.navigate(['/read', this.currentBlog.blogId]);
        }, 1000);
      },
      error => {
        console.log("error occured");
        console.log(error);
        this.toastr.errorToastr('This is error toast.', 'Oops!');
      }
    );

}
}
