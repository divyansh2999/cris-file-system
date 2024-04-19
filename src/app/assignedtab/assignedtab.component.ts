import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { _MatInternalFormField } from '@angular/material/core';
import {MDCFormField} from '@material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-assignedtab',
  standalone: true,
  imports: [MatSelectModule,MatFormFieldModule,_MatInternalFormField,NavbarComponent,CommonModule,],
  providers: [DataService, HttpClient, Router],
  templateUrl: './assignedtab.component.html',
  styleUrl: './assignedtab.component.scss'
})
export class AssignedtabComponent implements OnInit {
  assignedData: any = []
  assignedData1: any = []
  searchQuery:string='';
  ngOnInit(): void {
    this.getAssignedData();
  }
  getAssignedData = () => {
    fetch('http://192.168.1.169:1100/assign')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network issue');
        }
        return response.json();
      })
      .then(data1 => {
        this.assignedData1 = data1.data1;
        console.log("Data has been stored in array assignedData1 and listed as:-", this.assignedData1)
      })
  }
}