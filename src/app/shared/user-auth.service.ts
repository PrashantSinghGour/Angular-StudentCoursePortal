import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user.interface';
import { FormGroup, Validators, FormControl } from '@angular/forms';
declare var firebase: any;

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private router: Router) { }

  Form = new FormGroup(
    {
      // Add Multiple validation
      Email: new FormControl('', [Validators.email,Validators.required]),
      Password: new FormControl('', [Validators.required])
      
    }
  )

 
  signupUser(user) {
    console.log(user.Email);
    console.log(user.password);
    firebase.auth().createUserWithEmailAndPassword(user.Email, user.password)
      .catch(function (error) {
        // Handle Errors here.
        //var errorCode = error.code;
        //var errorMessage = error.message;
        // ...
        console.log(error);
        
      });
      this.router.navigate(['signin']);
  }
  logout() {
    firebase.auth().signOut();
   
  }
 

  signinUser(user) {
    
   
    firebase.auth().signInWithEmailAndPassword(user.Email, user.Password)
      .catch(function (error) {

        
        // Handle Errors here.
        //var errorCode = error.code;
        //var errorMessage = error.message;
        console.log(error);
        window.alert(error.message)
        // ...
      });
      console.log(user.Email);
      console.log(user.Password);
     
      this.router.navigate(['student']);
      
  }
  isAuthenticated() {
    var user = firebase.auth().currentUser;
    if (user) {
      return true;
    }
    else {
      return false;
    }
  }
  userProfile() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl,password, uid, emailVerified;
    
    
    if (user != null) {
      //name = user.displayName;
      email = user.Email;
      password=user.Password;
    return user;
      //photoUrl = user.photoURL;
      //emailVerified = user.emailVerified;
      //uid = user.uid;
    }
    else{
      return null;
    }
  }
}
