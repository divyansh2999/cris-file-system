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
  selector: 'app-efsu',
  standalone: true,
  imports: [NavbarComponent,CommonModule, RouterLink,MatTooltip],
  providers: [DataService, HttpClient,MatDialog,HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {


  showAlert = (alertText: any) => {
    Swal.fire({
      title: 'Submitted',
      text: alertText,
      icon: 'success',
  
      confirmButtonText: 'OK',
      width: '25.9em',
      timer: 2000
    });
  }

  selectedFile: any;
  assignedData: any = []
  router: any;
  date = new Date();
  dateString = this.date.toLocaleDateString();
  i: any;
  validation5: any = [];
  showProcessContainer:boolean=false;

  constructor(private dataservice: DataService,private dialog: MatDialog, httpclient:HttpClient) {
  }

  toggleContainer=()=>{
    this.showProcessContainer = !this.showProcessContainer;
  }
  
  ngOnInit(): void {
    this.getAssignedData();
    $('#nav-id').css('display','block');
  }
  
  getAssignedData = () => {
    fetch('http://192.168.1.169:1100/assign')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network issue');
        }
        return response.json();
      })
      .then(data => {
        this.assignedData = data.data;
        this.assignedData.forEach((items: any) => {
          if (items.status === "File Delivered") {
            this.validation5.push(items);
          }
        })
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
  sendPendingStatus = (filename:any)=>{
    let fileToUpdate = this.assignedData.find((item: any) => item.filename === filename);
    this.selectedFile = fileToUpdate;
    console.log(this.selectedFile)
  }
  sendNotStartedStatus = (filename:any)=>{
    let fileToUpdate = this.assignedData.find((item: any) => item.filename === filename);
    this.selectedFile = fileToUpdate;
    console.log(this.selectedFile)
    const fileUpdate = {
      status:"Not yet started", filename:this.selectedFile.filename
    }
    console.log(fileUpdate)
    if(this.selectedFile){
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as not yet started in database',res);
        },
        error:(error:any)=>{
          console.error('Error while updating as not started');
        }
      });
    }
    else{
      console.log('No update function invoked');
    }
    let alertText = 'File forwarded successfully'
    this.showAlert(alertText)
    window.location.reload();
  }
  sendCompletedStatus = (filename:any)=>{
    let fileToUpdate = this.assignedData.find((item: any) => item.filename === filename);
    this.selectedFile = fileToUpdate;
    console.log(this.selectedFile)
    const fileUpdate = {
      status:"Completed", filename:this.selectedFile.filename, approved:this.dateString
    }
    console.log(fileUpdate)
    if(this.selectedFile){
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as completed in database',res);
          this.getAssignedData()
        },
        error:(error:any)=>{
          console.error('Error while updating as completed');
        }
      });
    }
    else{
      console.log('No update function invoked');
    }
    let alertText = 'File forwarded successfully'
    this.showAlert(alertText)
  }
  sendPendingV1 = (selectedFile:any)=>{
    const fileUpdate = {
      status:"Attribute Info. Verified", filename:this.selectedFile.filename, approved:this.dateString
    }
    if(this.selectedFile){
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as pending state Valildation 1 in database',res);
          this.getAssignedData();
        },
        error:(error:any)=>{
          console.error('Error while updating as pending');
        }
      });
    }
    else{
      console.log('No update function invoked');
    }
    this.showProcessContainer=false;
    let alertText = 'File forwarded successfully'
    this.showAlert(alertText)
  }
  sendPendingV2 = (selectedFile:any)=>{
    console.log(this.selectedFile)
    const fileUpdate = {
      status:"Topological Error Verified", filename:this.selectedFile.filename, approved:this.dateString
    }
    console.log(fileUpdate)
    if(this.selectedFile){
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as pending state Valildation 2 in database',res);
          this.getAssignedData();
        },
        error:(error:any)=>{
          console.error('Error while updating as pending');
        }
      });
    }
    else{
      console.log('No update function invoked');
    }
    this.showProcessContainer=false;
    let alertText = 'File forwarded successfully'
    this.showAlert(alertText)
  }
  sendPendingV3 = (selectedFile:any)=>{
    console.log(this.selectedFile)
    const fileUpdate = {
      status:"Route Creation", filename:this.selectedFile.filename, approved:this.dateString
    }
    console.log(fileUpdate)
    if(this.selectedFile){
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as pending state Valildation 2 in database',res);
          this.getAssignedData();
        },
        error:(error:any)=>{
          console.error('Error while updating as pending');
        }
      });
    }
    else{
      console.log('No update function invoked');
    }
    this.showProcessContainer=false;
    let alertText = 'File forwarded successfully'
    this.showAlert(alertText)
  }
  sendPendingV4 = (selectedFile:any)=>{
    console.log(this.selectedFile)
    const fileUpdate = {
      status: "Caliberation", 
      filename: this.selectedFile.filename, 
      approved: this.dateString
    }
    console.log(fileUpdate)
    if (this.selectedFile) {
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as pending state Validation 2 in database',res);
          this.getAssignedData();
        },
        error:(error:any)=>{
          console.error('Error while updating as pending');
        }
      });
    } else {
      console.log('No update function invoked');
    }
    this.showProcessContainer=false;
    let alertText = 'File forwarded successfully'
    this.showAlert(alertText)
  }
  sendPendingV5 = (selectedFile:any)=>{
    console.log(this.selectedFile)
    const fileUpdate = {
      status:"LRS Process Completed", filename:this.selectedFile.filename, approved:this.dateString
    }
    console.log(fileUpdate)
    if(this.selectedFile){
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as pending state Valildation 2 in database',res);
          this.getAssignedData();
        },
        error:(error:any)=>{
          console.error('Error while updating as pending');
        }
      });
    }
    else{
      console.log('No update function invoked');
    }
    this.showProcessContainer=false;
    let alertText = 'File forwarded successfully'
    this.showAlert(alertText)
  }
  sendPendingV6 = (selectedFile:any)=>{
    console.log(this.selectedFile)
    const fileUpdate = {
      status:"Overall Verification Completed", filename:this.selectedFile.filename, approved:this.dateString
    }
    console.log(fileUpdate)
    if(this.selectedFile){
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as pending state Valildation 2 in database',res);
          this.getAssignedData();
        },
        error:(error:any)=>{
          console.error('Error while updating as pending');
        }
      });
    }
    else{
      console.log('No update function invoked');
    }
    this.showProcessContainer=false;
    let alertText = 'File forwarded successfully'
    this.showAlert(alertText)
  }
  sendPendingV7 = (selectedFile:any)=>{
    console.log(this.selectedFile)
    const fileUpdate = {
      status:"File Delivered", filename:this.selectedFile.filename, approved:this.dateString
    }
    console.log(fileUpdate)
    if(this.selectedFile){
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as pending state Valildation 2 in database',res);
          this.getAssignedData();
        },
        error:(error:any)=>{
          console.error('Error while updating as pending');
        }
      });
    }
    else{
      console.log('No update function invoked');
    }
    this.showProcessContainer=false;
    let alertText = 'File forwarded successfully'
    this.showAlert(alertText)
  }
}
