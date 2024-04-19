import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

@Injectable({
  providedIn: 'root'
})
export class CombinedGuard implements CanActivate {
  constructor(private authGuard: AuthGuard, private adminGuard: AdminGuard) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // Combining the logic of AuthGuard and AdminGuard using the OR operator
      return this.authGuard.canActivate() || this.adminGuard.canActivate();
  }
}
