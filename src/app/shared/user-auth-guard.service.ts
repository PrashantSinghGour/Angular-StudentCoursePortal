import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardService {

  constructor(private _data: UserAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
    return this._data.isAuthenticated();
  }
}
