import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { ProcessComponent } from '../process/process.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileDataService } from '../file-data.service';
import { NavbarComponent } from '../navbar/navbar.component';
import $ from 'jquery';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-efsu',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, MatTooltip],
  providers: [DataService, HttpClient, HttpClientModule, FileDataService],
  templateUrl: './efsu.component.html',
  styleUrl: './efsu.component.scss'
})
export class EfsuComponent implements OnInit {

  showAlertForward = (alertText: any) => {
    Swal.fire({
      title: 'Forwarded',
      text: alertText,
      icon: 'success',
      confirmButtonText: 'OK',
      width: '25.9em',
      timer: 2000
    });
  }

  selectedFile: any;
  assignedData: any = []
  assignedData2: any;
  router: any;
  date = new Date();
  dateString = this.date.toLocaleDateString();
  public initialLoadValue = 0;
  showProcessContainer: boolean = false;
  i: any;
  public credentials: any;
  assignedData1: any;
  name: string = "";
  amandeepData: any;
  empData: any = [];
  constructor(private dataservice: DataService, httpclient: HttpClient, private authService: AuthService) {
  }
  public status: any;
  toggleContainer = (stat: any) => {
    console.log(`Status form Toggle container is `, status)
    this.status = stat;
    this.showProcessContainer = !this.showProcessContainer;
  }
  closeToggle = () => {
    this.showProcessContainer = !this.showProcessContainer;
  }
  empEmail: any;
  ngOnInit(): void {
   
    this.empEmail = JSON.parse(sessionStorage.getItem('credentials')).email;
    console.log(this.empEmail);
    this.getAssignedData();
    $('#nav-id').css('display', 'block');
  }
  clearToken(): void {
    sessionStorage.clear()
  }
  reloadData(): void {
    this.dataservice.getData().subscribe(response => {
    });
  }
  getAssignedData = () => {
    fetch('http://192.168.1.169:1100/assign')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network issue');
        }
        return response.json();
      })
      .then(data2 => {
        this.assignedData2 = data2.data2;
        if (this.empEmail === 'amandeep@ml.com') {
          this.name = 'Amandeep'
          this.empData = this.assignedData2.filter((emp: any) => emp.employee_assigned === this.name);
        }
        else if (this.empEmail === 'robert@ml.com') {
          this.name = 'Robert'
          this.empData = this.assignedData2.filter((emp: any) => emp.employee_assigned === this.name);
        }
        else if (this.empEmail === 'jack@ml.com') {
          this.name = 'Jack'
          this.empData = this.assignedData2.filter((emp: any) => emp.employee_assigned === this.name);
        }
        else if (this.empEmail === 'rosy@ml.com') {
          this.name = 'Rosy'
          this.empData = this.assignedData2.filter((emp: any) => emp.employee_assigned === this.name);
        }
        else if (this.empEmail === 'mandie@ml.com') {
          this.name = 'Mandie'
          this.empData = this.assignedData2.filter((emp: any) => emp.employee_assigned === this.name);
        }
        else if (this.empEmail === 'ronald@ml.com') {
          this.name = 'Ronald'
          this.empData = this.assignedData2.filter((emp: any) => emp.employee_assigned === this.name);
        }
        else if (this.empEmail === 'joe@ml.com') {
          this.name = 'Joe'
          this.empData = this.assignedData2.filter((emp: any) => emp.employee_assigned === this.name);
        }
        console.log("Data has been stored in array assignedData2 and listed as:-", this.assignedData2)
      })
  }
  logout(): void {
    sessionStorage.clear();
    window.location.reload();
  }
  notStarted = () => {
    alert('Not yet started button is pressed');
  }
  completed = () => {
    alert('File has beed closed after completion');
  }
  sendPendingStatus = (filename: any) => {
    let fileToUpdate = this.assignedData2.find((item: any) => item.filename === filename);
    this.selectedFile = fileToUpdate;
    console.log(this.selectedFile);
  }
  sendNotStartedStatus = (filename: any) => {
    let fileToUpdate = this.assignedData.find((item: any) => item.filename === filename);
    this.selectedFile = fileToUpdate;
    console.log(this.selectedFile)
    const fileUpdate = {
      status: "Not yet started", filename: this.selectedFile.filename
    }
    console.log(fileUpdate)
    if (this.selectedFile) {
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next: (res: any) => {
          console.log('Selected file status has been updated as not yet started in database', res);
        },
        error: (error: any) => {
          console.error('Error while updating as not started');
        }
      });
    }
    else {
      console.log('No update function invoked');
    }
    let alertText = 'File forwarded sucessfully'
    this.showAlertForward(alertText)
    window.location.reload();
  }
  sendCompletedStatus = (filename: any) => {
    let fileToUpdate = this.assignedData.find((item: any) => item.filename === filename);
    this.selectedFile = fileToUpdate;
    console.log(this.selectedFile)
    const fileUpdate = {
      status: "Completed", filename: this.selectedFile.filename
    }
    console.log(fileUpdate)
    if (this.selectedFile) {
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next: (res: any) => {
          console.log('Selected file status has been updated as completed in database', res);
        },
        error: (error: any) => {
          console.error('Error while updating as completed');
        }
      });
    }
    else {
      console.log('No update function invoked');
    }
    let alertText = 'File forwarded sucessfully'
    this.showAlertForward(alertText)
    window.location.reload();
  }
  sendV1 = (filename: any) => {
    let fileV1 = this.assignedData.find((item: any) => item.filename === filename);
    console.log(fileV1);
    console.log('File stored to Validation 1 stage')
    let alertText = 'File forwarded sucessfully'
    this.showAlertForward(alertText)
    console.log('The file that is to be updated is : ', fileV1)
    window.location.reload();
  }
  sendV2 = (filename: any) => {
    let fileV2 = this.assignedData.find((item: any) => item.filename === filename);
    console.log(fileV2);
    console.log('File stored to Validation 1 stage')
    let alertText = 'File forwarded sucessfully'
    this.showAlertForward(alertText)
    console.log('The file that is to be updated is : ', fileV2)
    window.location.reload();
  }
  sendPendingV1 = (selectedFile: any) => {
    const fileUpdate = {
      status: "Attribute Info. Verified", filename: this.selectedFile.filename, approved: this.dateString
    }
    if (this.selectedFile) {
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next: (res: any) => {
          console.log('Selected file status has been updated as pending state Valildation 1 in database', res);
          this.getAssignedData();
        },
        error: (error: any) => {
          console.error('Error while updating as pending');
        }
      });
    }
    else {
      console.log('No update function invoked');
    }
    this.showProcessContainer = false;
  }
  sendPendingV2 = (selectedFile: any) => {
    console.log(this.selectedFile)
    const fileUpdate = {
      status: "Topological Error Verified", filename: this.selectedFile.filename, approved: this.dateString
    }
    console.log(fileUpdate)
    if (this.selectedFile) {
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next: (res: any) => {
          console.log('Selected file status has been updated as pending state Valildation 2 in database', res);
          this.getAssignedData();
        },
        error: (error: any) => {
          console.error('Error while updating as pending');
        }
      });
    }
    else {
      console.log('No update function invoked');
    }
    this.showProcessContainer = false;
  }
  sendPendingV3 = (selectedFile: any) => {
    console.log(this.selectedFile)
    const fileUpdate = {
      status: "Route Creation", 
      filename: this.selectedFile.filename, 
      approved: this.dateString
    }
    console.log(fileUpdate)
    if (this.selectedFile) {
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next: (res: any) => {
          console.log('Selected file status has been updated as pending state Valildation 2 in database', res);
          this.getAssignedData();
        },
        error: (error: any) => {
          console.error('Error while updating as pending');
        }
      });
    }
    else {
      console.log('No update function invoked');
    }
    this.showProcessContainer = false;
  }
  sendPendingV4 = (selectedFile: any) => {
    console.log(this.selectedFile)
    const fileUpdate = {
      status: "Caliberation",
      filename: this.selectedFile.filename,
      approved: this.dateString
    }
    console.log(fileUpdate)

    if (this.selectedFile) {
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next: (res: any) => {
          console.log('Selected file status has been updated as pending state Validation 2 in database', res);
          this.getAssignedData();
        },
        error: (error: any) => {
          console.error('Error while updating as pending');
        }
      });
    }
    else {
      console.log('No update function invoked');
    }
    this.showProcessContainer = false;
  }
  sendPendingV5 = (selectedFile: any) => {
    console.log(this.selectedFile)
    const fileUpdate = {
      status: "LRS Process Completed", filename: this.selectedFile.filename, approved: this.dateString
    }
    console.log(fileUpdate)
    if (this.selectedFile) {
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next: (res: any) => {
          console.log('Selected file status has been updated as pending state Valildation 2 in database', res);
          this.getAssignedData();
        },
        error: (error: any) => {
          console.error('Error while updating as pending');
        }
      });
    }
    else {
      console.log('No update function invoked');
    }
    this.showProcessContainer = false;
  }
  sendPendingV6 = (selectedFile: any) => {
    console.log(this.selectedFile)
    const fileUpdate = {
      status: "Overall Verification Completed", filename: this.selectedFile.filename, approved: this.dateString
    }
    console.log(fileUpdate)
    if (this.selectedFile) {
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next: (res: any) => {
          console.log('Selected file status has been updated as pending state Valildation 2 in database', res);
          this.getAssignedData();
        },
        error: (error: any) => {
          console.error('Error while updating as pending');
        }
      });
    }
    else {
      console.log('No update function invoked');
    }
    this.showProcessContainer = false;
  }
  sendPendingV7 = (selectedFile: any) => {
    console.log(this.selectedFile)
    const fileUpdate = {
      status: "File Delivered", filename: this.selectedFile.filename, approved: this.dateString
    }
    console.log(fileUpdate)
    if (this.selectedFile) {
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next: (res: any) => {
          console.log('Selected file status has been updated as pending state Valildation 2 in database', res);
          this.getAssignedData();
        },
        error: (error: any) => {
          console.error('Error while updating as pending');
        }
      });
    }
    else {
      console.log('No update function invoked');
    }
    this.showProcessContainer = false;
  }
}
