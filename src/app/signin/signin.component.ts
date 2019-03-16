import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../shared/user-auth.service';
import { PortalService } from '../shared/portal.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  submitted: boolean;

  constructor(public portalService:PortalService,public UAService:UserAuthService,public router:Router) { }
  formControls = this.UAService.Form.controls;
 
  
      onSubmit() { 
    this.submitted=true;
    
    if(this.UAService.Form.valid){ 
      this.UAService.signinUser(this.UAService.Form.value);
      this.submitted=false;
  
    
  }
}
  ngOnInit() {}


}
