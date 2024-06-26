import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if(this.authService.isLoggedIn1()){
      return true;
    } 
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}