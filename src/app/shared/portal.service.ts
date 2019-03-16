import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { PasswordValidator } from '../PasswordValidator';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, BehaviorSubject } from 'rxjs';
import {finalize} from "rxjs/operators";
import { Router } from '@angular/router';
declare var firebase: any;

@Injectable({
  providedIn: 'root'
})
export class PortalService {



  
  constructor(public firestore: AngularFirestore, public router: Router, public storage: AngularFireStorage) {
   
  }
  studentList: AngularFireList<any>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}$";
  public percentage: any;

  public percentageChanges: BehaviorSubject<any> = new BehaviorSubject<any>(this.percentage);

  setPercentage(percent: any): void{
      this.percentage = percent;
      this.percentageChanges.next(percent);
  }
  
  SignUp=new FormGroup({

   
    fname:new FormControl('',[Validators.required]),
    lname:new FormControl('',[Validators.required]),
    Email:new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
    Telephone:new FormControl('',[Validators.required,Validators.pattern('^[0-9]{10}$')]),
    img:new FormControl ('', [Validators.required]),
    DOB:new FormControl('',[Validators.required]),
    marks101:new FormControl ('', [Validators.required]),
    marks102:new FormControl ('', [Validators.required]),
    marks201:new FormControl ('', [Validators.required]),
    marks202:new FormControl ('', [Validators.required]),
    password:new FormControl ('',[Validators.required]),
    confirmPassword:new FormControl ('')
     
    },{validators:PasswordValidator});

 
   
    

//add student
createPost(postData: FormData, file: any[]){
  // console.log(file);
  const image = file[0];

  //loop through the files array of objects in case of multiple images
 
  const filepath = Date.now() + "-" + file[0]["name"];
  
  //get the reference
  const fileRef = this.storage.ref(filepath);
  const task = this.storage.upload(filepath, image)
 
  //get the percentage
  this.uploadPercent = task.percentageChanges();
  //subscribe to the percentage
  
  this.uploadPercent.subscribe(percent => {
    console.log("x", percent);
    this.setPercentage(percent);
  })
  
  task.snapshotChanges().pipe(
    
    finalize(() => {
      console.log("File is being processed, you will be redirected soon...");
      fileRef.getDownloadURL().subscribe(url => {
        this.downloadURL = url;

        let newpost = {
          fname:postData["fname"],
          lname:postData["lname"],
          Email:postData["Email"],
          Telephone:postData["Telephone"],
          img:this.downloadURL,
          DOB:postData["DOB"],
          marks101:postData["marks101"],
          marks102:postData["marks102"],
    
          marks201:postData["marks201"],
          marks202:postData["marks202"],
    
          password:postData["password"],
          
          fileref: filepath
        }

        //this.firestore.collection("posts").doc(filepath).set(newpost)

        this.firestore.collection("posts").add(newpost)
        .then(post => {
         /* get the reference of the document created
          console.log(post.path);
          this.firestore.doc(post.path).get().subscribe(x => {
            console.log(x.data());
          })
         */
        this.setPercentage(null);
          
        }).catch(err => {
          console.log("error: ", err);
        });
        
        
      })

    })
  ).subscribe()
 }
   //store the download link  with the rest of the data


//returning the posts
public getPosts(){
  return this.firestore.collection("posts").snapshotChanges();
}

//delete the post
public deletePost(docID: string, image: string){
  
  //get the reference to the image
  const storageRef = this.storage.storage.ref();
  storageRef.child(image).delete()
  .then(()=>{
    console.log("image delete")
  }).catch(err => {
    console.log(err)
  });
  this.firestore.collection("posts").doc(docID)
  .delete().then(()=>{
   console.log("post deleted")     
  }).catch(err => {
    console.log(err)
  })
}





  populateForm(student) 
  {
    this.SignUp.setValue(student);
  }
  
  
 


  



}
