import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { from } from 'rxjs';
import { Observable, throwError } from "rxjs";
import { ToastrManager } from 'ng6-toastr-notifications';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data ;
  private url ='http://localhost:3000/blogs';
  private url2 ='http://localhost:3000';
  constructor(private _http: HttpClient, public toastr: ToastrManager) {
    console.log('DAta service called');
  }
  public getAllPosts(){
    return this._http.get(`${this.url}/all`);
  }
  public getApost(blogId){
    console.log("getApost called",blogId);
    return this._http.get(`${this.url}/view/${blogId}`);
  }
  public getUserPosts(_id) {
    console.log(_id);
    return this._http.get(`${this.url}/userBlogs/${_id}`);
  }
  public newComment(obj){
    return this._http.post(`${this.url2}/createComment`,obj);
  }
  public getAllComments(blogId) {
    return this._http.get(`${this.url2}/getComments/${blogId}`);
  }
  public createPost(obj){
    return this._http.post(`${this.url}/create`, obj);
  }
  public blogEdit(blogId,blogBody){
    return this._http.put(`${this.url}/${blogId}/edit`,blogBody)
  }
  public deleteBlog(blogId){
    return this._http.post(`${this.url}/${blogId}/delete`,{});
  }
  public getBookmarkedPosts(userId){
    return this._http.get(`${this.url}/bookmarkedposts/${userId}`);
  }
  
}
