import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AssignedtabComponent } from '../assignedtab/assignedtab.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashComponent } from '../dash/dash.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import $ from 'jquery';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterLink,AssignedtabComponent,DashboardComponent,DashComponent,MatMenuModule],
  providers:[Router,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {

  template3Variable:any;

  constructor ( private router:Router){}
  ngOnInit(): void {}
  navigateToReport=()=>{
    this.router.navigate(['/assignedtab']);   
  }
  savedCredentials=sessionStorage.getItem('credentials');
  savedCredentials1=sessionStorage.getItem('credentials1');
  savedCredentials2=sessionStorage.getItem('credentials2');
  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']); 
  }
  toggle:boolean=false;
  switchToDashboard=()=>{
    this.toggle = true
      this.router.navigate(['/dashboard', { variable: this.toggle }]);
  }
  showTemplate3=()=>{
      this.template3Variable=true
      this.router.navigate(['dashboard',{ template3Variable:this.template3Variable}]);
  }
}
// export const transferVariable=toggle
