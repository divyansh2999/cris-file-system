import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean = false;
  private loggedIn1: boolean = false;
  private loggedIn2: boolean = false;
  // private loggedIn2: boolean = false;
  // private loggedIn3: boolean = false;
  private loggedOut:boolean = true;

  constructor() {}


  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('credentials');
   
  }
  isLoggedIn1(): boolean {
    return !!sessionStorage.getItem('credentials1');
  }
  isLoggedIn2(): boolean {
    return !!sessionStorage.getItem('credentials2');
  }
  

  isLoggedOut():boolean {
    return this.loggedOut;
  }
  
  setLoggedIn(value: boolean) {
    
    this.loggedIn = value;

    this.loggedOut = value
  }
  setLoggedIn1(value: boolean) {
   
    this.loggedIn = value;
 
    this.loggedOut = value
  }
  setLoggedIn2(value: boolean) {
    
    this.loggedIn = value;

    this.loggedOut = value
  }
}
