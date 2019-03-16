import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { MainPAgeComponent } from './main-page/main-page.component';
import { AngularFireModule } from '@angular/fire';


import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { PortalService } from './shared/portal.service';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { UserAuthService } from './shared/user-auth.service';
import { UserAuthGuardService } from './shared/user-auth-guard.service';
import { AngularFireAuthModule } from '@angular/fire/auth';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    AdminComponent,
    StudentComponent,
    MainPAgeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,FormsModule,
    BrowserAnimationsModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,AngularFireAuthModule
  
  ],
  providers: [AngularFirestore,UserAuthService,UserAuthGuardService,PortalService,{ provide: StorageBucket, useValue: "gs://mcurd-6a4ae.appspot.com"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
