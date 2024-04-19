import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [BrowserModule],
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  name = new FormControl('');

  showAlert = (alertText: any) => {
    Swal.fire({
      title: 'Oops',
      text: alertText,
      icon: 'warning',
      confirmButtonText: 'OK',
      width: '25.9em',
      timer: 2000
    });
  }
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService,) { }
  ngOnInit(): void {
    $('#nav-id').css('display', 'none')
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  savedCredentials: any;
  savedCredentialsAmandeep: any;
  savedCredentialsRobert: any;
  savedCredentials1: any;
  savedCredentials2: any;
  exportVariable:boolean;

  login(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      let credentials, credentials1, credentials2;
      if (email == 'employee@ml.com' && password == 'ml@infomap') {
        credentials = {
          email: 'employee@ml.com',
          password: 'ml@infomap'
        };
        sessionStorage.setItem("credentials", JSON.stringify(credentials));
        this.savedCredentials = sessionStorage.getItem('credentials');
        console.log(this.savedCredentials)
        this.authService.setLoggedIn(true);
        this.router.navigate(['/dashboard']).then(() => {
          window.location.reload();
        });
      }
      else if (email == 'amandeep@ml.com' && password == '123') {
        credentials = {
          email: 'amandeep@ml.com',
          password: '123'
        };
        sessionStorage.setItem('credentials', JSON.stringify(credentials));
        this.exportVariable=true;
        this.router.navigate(['/dashboard', { data: this.exportVariable }]).then(()=>{
          window.location.reload();
        });
        this.authService.setLoggedIn(true);
        // this.router.navigate(['/dashboard']).then(() => {
        //   window.location.reload();
        // });
      }
      else if (email == 'robert@ml.com' && password == '123') {
        credentials = {
          email: 'robert@ml.com',
          password: '123'
        };
        sessionStorage.setItem('credentials', JSON.stringify(credentials));
        this.exportVariable=true;
        this.router.navigate(['/dashboard', { data: this.exportVariable }]).then(()=>{
          window.location.reload();
        });
        this.authService.setLoggedIn(true);
        
      }
      else if (email == 'jack@ml.com' && password == '123') {
        credentials = {
          email: 'jack@ml.com',
          password: '123'
        };
        sessionStorage.setItem('credentials', JSON.stringify(credentials));
        this.exportVariable=true;
        this.router.navigate(['/dashboard', { data: this.exportVariable }]).then(()=>{
          window.location.reload();
        });
        this.authService.setLoggedIn(true);
       
      }
      else if (email == 'rosy@ml.com' && password == '123') {
        credentials = {
          email: 'rosy@ml.com',
          password: '123'
        };
        sessionStorage.setItem('credentials', JSON.stringify(credentials));
        this.exportVariable=true;
        this.router.navigate(['/dashboard', { data: this.exportVariable }]).then(()=>{
          window.location.reload();
        });
        this.authService.setLoggedIn(true);
        
      }
      else if (email == 'mandie@ml.com' && password == '123') {
        credentials = {
          email: 'mandie@ml.com',
          password: '123'
        };
        sessionStorage.setItem('credentials', JSON.stringify(credentials));
        this.exportVariable=true;
        this.router.navigate(['/dashboard', { data: this.exportVariable }]).then(()=>{
          window.location.reload();
        });
        this.authService.setLoggedIn(true);
        
      }
      else if (email == 'ronald@ml.com' && password == '123') {
        credentials = {
          email: 'ronald@ml.com',
          password: '123'
        };
        sessionStorage.setItem('credentials', JSON.stringify(credentials));
        this.exportVariable=true;
        this.router.navigate(['/dashboard', { data: this.exportVariable }]).then(()=>{
          window.location.reload();
        });
        this.authService.setLoggedIn(true);
        
      }
      else if (email == 'joe@ml.com' && password == '123') {
        credentials = {
          email: 'joe@ml.com',
          password: '123'
        };
        sessionStorage.setItem('credentials', JSON.stringify(credentials));
        this.exportVariable=true;
        this.router.navigate(['/dashboard', { data: this.exportVariable }]).then(()=>{
          window.location.reload();
        });
        this.authService.setLoggedIn(true);
       
      }
      else if (email == 'admin@ml.com' && password == '123') {
        credentials1 = {
          email: 'admin@ml.com',
          password: '123'
        };
        sessionStorage.setItem("credentials1", JSON.stringify(credentials1));
        this.savedCredentials1 = sessionStorage.getItem('credentials1');
        console.log(this.savedCredentials1)
        this.authService.setLoggedIn1(true);
        this.router.navigate(['/dashboard']).then(() => {
          window.location.reload();
        });
      }
      else if (email == 'client@ml.com' && password == '123') {
        credentials2 = {
          email: 'client@ml.com',
          password: '123'
        };
        sessionStorage.setItem("credentials2", JSON.stringify(credentials2));
        console.log(this.savedCredentials2)
        this.savedCredentials2 = sessionStorage.getItem('credentials2');
        this.authService.setLoggedIn2(true);
        this.router.navigate(['/dash']).then(() => {
          window.location.reload();
        });
      }
      else {
        let alertText = 'Invalid Credentials';
        this.showAlert(alertText);
      }
    }
    else {
      let alertText = 'Invalid Credentials';
      this.showAlert(alertText);
    }
  }
  logout(): void {
    sessionStorage.clear();
    window.location.reload();
  }
}
