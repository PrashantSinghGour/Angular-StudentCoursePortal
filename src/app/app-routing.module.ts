import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { MainPAgeComponent } from './main-page/main-page.component';
import { SignupComponent } from './signup/signup.component';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { UserAuthGuardService } from './shared/user-auth-guard.service';

const routes: Routes = [
  { path: '', component:MainPAgeComponent}, 
  { path: 'main-page', component: MainPAgeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'student', component: StudentComponent,canActivate:[UserAuthGuardService]},
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
