import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public greeting='morning';
  public username= localStorage.getItem('username');
  constructor(private data: DataService, private router: Router) {
    console.log("Dashboard constructor called");
   }
  public allposts;
  public items;
  public pageOfItems:Array<any>;
  public popularTagsArray;
  ngOnInit() {
    let userName = localStorage.getItem('username');
    let passWord = localStorage.getItem('password');
    if (userName && passWord) {
      
      let hrs = new Date().getHours();
      if (hrs < 12)
        this.greeting = 'Morning';
      else if (hrs >= 12 && hrs <= 17)
        this.greeting = 'Afternoon';
      else if (hrs >= 17 && hrs <= 24)
        this.greeting = 'Evening';
      this.data.getAllPosts().subscribe(
        data=>{
          this.allposts =data;
          this.allposts.reverse();
          this.items = this.allposts;
        },
        err=>{
          console.log(err);
        });
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  public signOutFunction(){
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
  public onChangePage(pageOfItems:Array<any>){
    this.pageOfItems=pageOfItems;
  }
  public filterBranchPosts(branch){
    let tempPosts=[];
    for (var post of this.allposts){
      if(post.branch == branch){
        tempPosts.push(post);
      }
    }
    this.items=tempPosts;
  }
  public filterByTags(tag) {
    let tempPosts = [];
    for (var post of this.allposts) {
      // if (post.tag == tag) {
      //   tempPosts.push(post);
      // }
      //console.log(post.tags);
      console.log(tag);
      if (post.tags.indexOf(tag) !== -1) {
        console.log(tag);
        tempPosts.push(post);
      }
    }
    console.log(tempPosts);
    this.items = tempPosts;
  }
  public globalPosts(){
    this.router.navigate(['/dashboard']);
    this.items=this.allposts;
  }
  public getPopularTags()
  {
    let tagsArray=[];
    if(this.allposts.length>0){
      for (let post of this.allposts){
        tagsArray.push(...post.tags);
      }
    }
    this.popularTagsArray=this.sortByFrequencyAndFilter(tagsArray);
    console.log(tagsArray,this.popularTagsArray);
  }
  public sortByFrequencyAndFilter(myArray) {
  let newArray = [];
  let freq = {};

  //Count Frequency of Occurances
  let i = myArray.length - 1;
  for (i; i > -1; i--) {
    var value = myArray[i];
    freq[value] == null ? freq[value] = 1 : freq[value]++;
  }

  //Create Array of Filtered Values
  for (let value in freq) {
    newArray.push(value);
  }

  //Define Sort Function and Return Sorted Results
  function compareFreq(a, b) {
    return freq[b] - freq[a];
  }

  return newArray.sort(compareFreq);
}


}
