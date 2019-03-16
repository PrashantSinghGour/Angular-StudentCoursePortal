import { Component, OnInit } from '@angular/core';


import { PortalService } from '../shared/portal.service';
import { UserAuthService } from '../shared/user-auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(public portalService: PortalService,public UAService:UserAuthService) 

  { }
  num1 : number;
num2 : number; 
marks101:number;
marks102:number;
marks201:number;
marks202:number;
  image: any=null;
  percentage: any = this.portalService.percentage;


submitted: boolean;
showSuccessMessage: boolean;
formControls = this.portalService.SignUp.controls;


  
 Add(no1:number,no2:number):number 
{  
    var ans:number;

    ans = (no1/no2)*100;
    
    return ans; 
}   

public handleInput($event: Event){
  //getting the image or files
  this.image = $event.target["files"];
  console.log(this.image);
}

 //this.portalService.insertStudent(this.portalService.SignUp.value);

      //submit
      addPost(data: FormData){

        this.submitted = true;
        if(this.portalService.SignUp.valid)
        {
          
        this.portalService.createPost(data, this.image);
        this.UAService.signupUser(this.portalService.SignUp.value);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
        this.submitted = false;
        this.portalService.SignUp.reset();
        
        //this is to be done for proper reset operation
        this.portalService.SignUp.setValue({
        
          fname: '',
          lname:'',
          Email: '',
          Telephone: '',
          img:'',
          DOB:'',
          marks101:'',
          marks102:'',
          marks201:'',
          marks202:'',
          password:'',
          confirmPassword:''
        });
      
      
      }
      }

ngOnInit() { this.portalService.percentageChanges.subscribe( x => this.percentage = x);}

     
    
   
}
