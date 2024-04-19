import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { DataService } from '../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FileDataService } from '../file-data.service';


@Component({
  selector: 'app-process',
  standalone: true,
  imports: [MatDialogModule,MatIconModule,HttpClientModule],
  providers:[MatDialog,MatIconButton,MatIconModule,DataService,FileDataService],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss'
})
export class ProcessComponent implements OnInit {

  selectedFile: any;
  assignedData: any = []
  router: any;
  date = new Date();
  dateString = this.date.toLocaleDateString();
  i: any;


  constructor(
    public dialogRef: MatDialogRef<ProcessComponent>,
    private dataservice: DataService,private dialog: MatDialog, httpclient:HttpClient,
    private filedataservice:FileDataService) {
  }


  ngOnInit(): void {
    this.getAssignedData();
    
    
  }
  
  openModal() {
    this.dialog.open(ProcessComponent);
    
  }

  getAssignedData = () => {
    fetch('http://192.168.1.169:1100')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network issue');
        }
        return response.json();
      })
      .then(data => {
        this.assignedData = data.data;
        console.log("Data has been stored in array assignedData and listed as:-", this.assignedData)
      })
  }
  logout(): void {
    this.router.navigate('/login');
  }
  notStarted = () => {
    alert('Not yet started button is pressed');
  }
  completed = () => {
    alert('File has beed closed after completion');
  }
  sendPendingV1 = (selectedFile:any)=>{
    this.selectedFile=this.filedataservice.getSelectedFile();
    console.log(this.selectedFile)
    const fileUpdate = {
      status:"Attribute Info. Verified", filename:this.selectedFile.filename, approved:this.dateString
    }
    if(this.selectedFile){
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as pending state Valildation 2 in database',res);
        },
        error:(error:any)=>{
          console.error('Error while updating as pending');
        }
      });     
    }
    else{
      console.log('No update function invoked');
    }
    this.closeDialog({Lat:'23.555',Long:'56.444'})
    alert('Are you sure to update the status')
  }
  closeDialog(data?: any): void {
		this.dialogRef.close(data);
	}
  sendPendingV2 = (selectedFile:any)=>{
    this.selectedFile=this.filedataservice.getSelectedFile();
    console.log(this.selectedFile)
    const fileUpdate = {
      status:"Topological Error Verified", filename:this.selectedFile.filename, approved:this.dateString
    }
    console.log(fileUpdate)
    if(this.selectedFile){
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as pending state Valildation 2 in database',res);
        },
        error:(error:any)=>{
          console.error('Error while updating as pending');
        }
      });
    }
    else{
      console.log('No update function invoked');
    }
    this.closeDialog({Lat:'23.555',Long:'56.444'})
    alert('Are you sure to update the status')
  }

  sendPendingV3 = (selectedFile:any)=>{
    this.selectedFile=this.filedataservice.getSelectedFile();
    console.log(this.selectedFile)
    const fileUpdate = {
      status:"LRS Process Completed", filename:this.selectedFile.filename, approved:this.dateString
    }
    console.log(fileUpdate)
    if(this.selectedFile){
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as pending state Valildation 2 in database',res);
        },
        error:(error:any)=>{
          console.error('Error while updating as pending');
        }
      });
    }
    else{
      console.log('No update function invoked');
    }
    this.closeDialog({Lat:'23.555',Long:'56.444'})
    alert('Are you sure to update the status')
  }
  sendPendingV4 = (selectedFile:any)=>{
    this.selectedFile=this.filedataservice.getSelectedFile();
    console.log(this.selectedFile)
    const fileUpdate = {
      status: "Overall Verification Completed", 
      filename: this.selectedFile.filename, 
      approved: this.dateString
    }
    console.log(fileUpdate)
  
    if (this.selectedFile) {
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as pending state Validation 2 in database',res);
        },
        error:(error:any)=>{
          console.error('Error while updating as pending');
        }
      });
    } else {
      console.log('No update function invoked');
    }
    this.closeDialog({Lat:'23.555',Long:'56.444'})
    alert('Are you sure to update the status')
  }
  sendPendingV5 = (selectedFile:any)=>{
    this.selectedFile=this.filedataservice.getSelectedFile();
    console.log(this.selectedFile)
    const fileUpdate = {
      status:"File Delivered", filename:this.selectedFile.filename, approved:this.dateString
    }
    console.log(fileUpdate)
    if(this.selectedFile){
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as pending state Valildation 2 in database',res);
        },
        error:(error:any)=>{
          console.error('Error while updating as pending');
        }
      }); 
    }
    else{
      console.log('No update function invoked');
    }
    this.closeDialog({Lat:'23.555',Long:'56.444'})
    alert('Are you sure to update the status')
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
    alert('Are you sure to update the status')
    window.location.reload();
  }
  sendCompletedStatus = (filename:any)=>{
    let fileToUpdate = this.assignedData.find((item: any) => item.filename === filename);
    this.selectedFile = fileToUpdate;
    console.log(this.selectedFile)
    const fileUpdate = {
      status:"Completed", filename:this.selectedFile.filename
    }
    console.log(fileUpdate)
    if(this.selectedFile){
      this.dataservice.updateFileStatus(fileUpdate).subscribe({
        next:(res:any)=>{
          console.log('Selected file status has been updated as completed in database',res);
        },
        error:(error:any)=>{
          console.error('Error while updating as completed');
        }
      });
    }
    else{
      console.log('No update function invoked');
    }
    alert('Are you sure to update the status')
    window.location.reload();
  }
  sendV1 = (filename:any)=>{
    let fileV1 = this.assignedData.find((item: any) => item.filename === filename);
    console.log(fileV1);
    console.log('File stored to Validation 1 stage')
    alert('Are you sure to update the status')
    console.log('The file that is to be updated is : ',fileV1)
    window.location.reload();
  }
  sendV2 = (filename:any)=>{
    let fileV2 = this.assignedData.find((item: any) => item.filename === filename);
    console.log(fileV2);
    console.log('File stored to Validation 1 stage')
    alert('Are you sure to update the status')
    console.log('The file that is to be updated is : ',fileV2)
    window.location.reload();
  }
}
