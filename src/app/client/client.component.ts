import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { ProcessComponent } from '../process/process.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [NavbarComponent,CommonModule, RouterLink, MatTooltip],
  providers: [DataService, HttpClient, MatDialog, HttpClientModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {

  selectedFile: any;
  assignedData: any = []
  router: any;
  date = new Date();
  dateString = this.date.toLocaleDateString();
  i: any;
  client: any;
  clientFiles: any = [];
  data: any;

  showAlert = (alertText: any) => {
    Swal.fire({
      title: 'Submitted',
      text: alertText,
      icon: 'success',
      confirmButtonText: 'OK',
      // cancelButtonText:'Close',
      width: '25.9em',
    });
  }
  constructor(private dataservice: DataService, private dialog: MatDialog, httpclient: HttpClient) {
  }
  ngOnInit(): void {   
    $('#nav-id').css('display','block');
    this.getAssignedData();
  }
  openModal() {
    this.dialog.open(ProcessComponent);
  }
  getAssignedData = () => {
    this.assignedData = []
    this.clientFiles= []
    fetch('http://192.168.1.169:1100/assign')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network issue');
        }
        return response.json();
      })
      .then(data => {
        this.assignedData = data.data;
        console.log("Data has been stored in array assignedData and listed as:-", this.assignedData)
        this.assignedData.forEach((items: any) => {
          if (items.status === "File Approved" || items.status === "Completed" || items.status === 'File Rejected')  {
            this.clientFiles.push(items); 
          }
          
        })
        console.log('Client Files are',   this.clientFiles);
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
  sendPendingV1 = (filename: any) => {
    let fileToUpdate = this.assignedData.find((item: any) => item.filename === filename);
    this.selectedFile = fileToUpdate;
    console.log(this.selectedFile)
    const fileUpdate = {
      status: " Pending Validation 1", filename: this.selectedFile.filename
    }
    console.log(fileUpdate)
    if (this.selectedFile) {
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next: (res: any) => {
          console.log('Selected file status has been updated as pending state Valildation 2 in database', res);
        },
        error: (error: any) => {
          console.error('Error while updating as pending');
        }
      });
    }
    else {
      console.log('No update function invoked');
    }
    alert('Are you sure to update the status')
    window.location.reload();
  }
  sendPendingV2 = (filename: any) => {
    let fileToUpdate = this.assignedData.find((item: any) => item.filename === filename);
    this.selectedFile = fileToUpdate;
    console.log(this.selectedFile)
    const fileUpdate = {
      status: " Pending Validation 2", filename: this.selectedFile.filename
    }
    console.log(fileUpdate)
    if (this.selectedFile) {
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next: (res: any) => {
          console.log('Selected file status has been updated as pending state Validation 2 in database', res);

        },
        error: (error: any) => {
          console.error('Error while updating as pending');
        }
      });
    }
    else {
      console.log('No update function invoked');
    }
    alert('Are you sure to update the status')
    window.location.reload();
  }
  sendApprovedStatus = (filename: any) => {
    debugger
    let fileToUpdate = this.assignedData.find((item: any) => item.filename === filename);
    this.selectedFile = fileToUpdate;
    console.log(this.selectedFile)
    const fileUpdate = {
      status: "File Approved", filename: this.selectedFile.filename, approved:this.dateString
    }
    console.log(fileUpdate);
    if (this.selectedFile) {
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next: (res: any) => {
          console.log('Selected file status has been updated as approved in database', this.selectedFile, res);
          let alertText='File approved successfully';
          this.showAlert(alertText)
         this.getAssignedData()  
        },
        error: (error: any) => {
          console.error('Error while updating as approved');
        }
      });
    }
    else {
      console.log('No update function invoked');
    }
  }
  sendRejectedStatus = (filename:any) =>  {
    debugger
    let fileToUpdate = this.assignedData.find((item:any) => item.filename === filename);
    this.selectedFile = fileToUpdate;
    const fileUpdate = {
      status: "File Rejected", filename: this.selectedFile.filename, rejected:this.dateString
    }
    if(this.selectedFile){
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next: (res:any) => {
          let alertText = 'File Rejected';
          this.showAlert(alertText)
          this.getAssignedData()
        },
        error: (error:any) => {
          console.error('Error while updating as rejected')
        }
      });
    }
    else{
      console.log('No update function invoked')
    }
  }
}