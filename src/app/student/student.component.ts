import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../shared/user-auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(public UAService:UserAuthService) { }

  ngOnInit() {
  }
  onLogout() {
    alert("Really want to log out?");
          this.UAService.logout();
      }
}
