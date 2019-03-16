import { Component, OnInit } from '@angular/core';
import { PortalService } from '../shared/portal.service';
declare const ageCalculate:any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  _age: number;

  
  constructor(public portalService: PortalService) 
  { }
  
  studentArray = [];
  showDeletedMessage: boolean;
  searchText: string = "";
date:any;
age:number;
  posts: any[];

  
  SSC(no1:number,no2:number):number 
  {  
      var ans:number;
  
      ans = (no1/no2)*100;
      
      return ans; 
  }  
  Age(date:string):any
  {
   var age= ageCalculate(date);
   return age;
  }
  

  getPosts(){
    this.portalService.getPosts().subscribe((posts) => {
      
      this.posts = [];
      posts.map(post => {
       this.posts.push({
          id: post.payload.doc.id,
          data: post.payload.doc.data()
        })
      })
      console.log(this.posts);
    })
  }

  
  deletePost(id:string, image: string){
    console.log(image)
    console.log(id)
    this.portalService.deletePost(id, image);
  }
  ngOnInit() 
  {
    this.getPosts();
  }

  

  filterCondition(post) 
  {
    return post.fname.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }
  filterCondition1(post) 
  {
    return post.lname.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }
}
