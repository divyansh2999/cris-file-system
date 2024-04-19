import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ProcessComponent } from './process/process.component';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProcessComponent,ReactiveFormsModule, FormsModule, CommonModule, RouterOutlet, RouterLink, HttpClientModule,NavbarComponent],
  providers: [LoginComponent,NgModule, ReactiveFormsModule, Router],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})
export class AppComponent {
  title = 'fileFolderUpload';
  dialog: any;
}




