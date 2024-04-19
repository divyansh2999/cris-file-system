import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { AgChartOptions, AgCharts } from "ag-charts-community";
import { MatDialogRef } from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterLink, CommonModule, AgChartsAngularModule],
  providers: [HttpClientModule, DataService],
  templateUrl: './upload-folder.component.html',
  styleUrl: './upload-folder.component.scss'
})
export class UploadFolderComponent implements OnInit {
  index: any;
  dialog: any;
  showAlertSuccess = (alertText: any) => {
    Swal.fire({
      title: 'Submitted',
      text: alertText,
      icon: 'success',
      confirmButtonText: 'OK',
      width: '25.9em',
      timer: 2000
    });
  }
  showAlert = (alertText: any) => {
    Swal.fire({
      title: 'Missing!',
      text: alertText,
      icon: 'warning',
      confirmButtonText: 'OK',
      width: '25.9em',
      timer: 2000
    });
  }
  constructor(private dataservice: DataService) { }
  ngOnInit(): void {
    this.employeeList();
  }
  insertMarkedFiles(arg0: any) {
    throw new Error('Method not implemented.');
  }
  public options: AgChartOptions = {};
  backend: any[] = [];
  frontend: any[] = [];
  dataArray: any = []
  UploadedFiles: any[] = [];
  numberOfFiles: any = [];
  chart: any;
  markbtn: any;
  selectedEmpName: any;
  markedFiles: any = [];
  selectedEmp: any;
  Employees: any = [];
  isMarked: any;
  arrIndex: any;
  sendData() {
    const dataToSend = {
      file: this.markedFiles,
      empAssign: this.selectedEmpName
    }
    if (this.markedFiles.length > 0 && this.selectedEmpName) {
      console.log(this.markedFiles);
      console.log(this.selectedEmpName);
      this.dataservice.insertData(dataToSend).subscribe({
        next: (res: any) => {
          console.log('Data has been inserted into the database', res);
        },
        error: (error: any) => {
          console.error('Error while inserting data into the database', error);
        }
      });
      let alertText = 'Files successfully Assigned ';
      this.showAlertSuccess('Files successfully Assigned')
      const indicesToDelete = this.markedFiles.map((file: any) => this.UploadedFiles.indexOf(file));
      this.deleteRows(indicesToDelete);
      this.markedFiles = [];
    }
    else {
      let alertText = 'Either file or employee not selected'
      this.showAlert(alertText)
      console.log('Either file or employee not selected.');
    }
  }
  sendSelectedEmp() {
    if (this.selectedEmpName) {
      this.dataservice.insertSelectedEmp(this.selectedEmpName).subscribe({
        next: (res: any) => {
          console.log('Selected Employeee has been inserted into the database', res);
        },
        error: (error: any) => {
          console.error('Error while inserting selected employee into the database', error);
        }
      });
    }
    else {
      console.log('No employee assigned in database');
    }
  }
  selectEmployee(event: any) {
    const empid = event.target?.value;
    if (empid) {
      let selectedEmp = this.Employees.find((emp: any) => emp.empid === empid);
      this.selectedEmpName = selectedEmp.empname
      console.log(this.selectedEmpName)
    }
  }
  employeeList() {
    this.dataservice.getEmpData().subscribe({
      next: (data: any) => {
        this.Employees = data.data;
        console.log(this.Employees)
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }
  deleteRow(index: number): void {
    this.UploadedFiles.splice(index, 1);
    console.log(index);
  }
  deleteRows(indices: number[]): void {
    indices.sort((a, b) => b - a);
    for (const index of indices) {
      this.UploadedFiles.splice(index, 1);
    }
  }
  mark(index: any): void {
    const fileToToggle = this.UploadedFiles[index];
    this.isMarked = this.markedFiles.some((file: any) => file === fileToToggle);
    if (this.isMarked) {
      this.markedFiles = this.markedFiles.filter((file: any) => file !== fileToToggle);
    } else {
      this.markedFiles.push(fileToToggle);
    }
    console.log(this.markedFiles);
  }
  plotChart = () => {
    const datapoint = this.UploadedFiles.map(item => (
      {
        asset: item.name,
        process: parseInt(item.size.split(' ')[0])
      }
    ))
    this.options = {
      data: datapoint,
      title: {
        text: "Files Status",
      },
      series: [
        {
          type: "pie",
          angleKey: "process",
          legendItemKey: "asset",
        },
      ],
    };
  }
  // converting the file size in gb or mb
  convertFileSize(sizeInBytes: number) {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;
    const gigabyte = megabyte * 1024;
    if (sizeInBytes >= gigabyte) {
      return (sizeInBytes / gigabyte).toFixed(2) + ' GB';
    } else if (sizeInBytes >= megabyte) {
      return (sizeInBytes / megabyte).toFixed(2) + ' MB';
    } else if (sizeInBytes >= kilobyte) {
      return (sizeInBytes / kilobyte).toFixed(2) + ' KB';
    } else {
      return sizeInBytes + ' bytes';
    }
  }
  formatDate(date: number) {
    const day = String(new Date(date).getDate()).padStart(2, '0');
    const month = String(new Date(date).getMonth() + 1).padStart(2, '0');
    const year = new Date(date).getFullYear();
    return `${day}-${month}-${year}`;
  }
  async handleSelectFolder(event: Event) {
    const inputElements = event.target as HTMLInputElement
    const files = inputElements.files;
    let fileUrl;
    const formData = new FormData();
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = file.name;
        const fileSizeInBytes = file.size;
        const fileSize = this.convertFileSize(fileSizeInBytes)
        const fileExtension = file.name.split('.').pop();
        fileUrl = file.webkitRelativePath;
        this.UploadedFiles.push({
          name: fileName,
          size: fileSize,
          extension: fileExtension,
        })
        this.plotChart();
      }
    }
  }
  images: string[] = ['../../assets/images/cardtkt.jpg', '../../assets/images/card3.jpg', '../../assets/images/card5.jpg',
    '../../assets/images/card6.jpg', '../../assets/images/card7.jpg', '../../assets/images/card8.jpg'
  ];
  currentSlideIndex = 0;
  showNextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.images.length;
  }
  showPreviousSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.images.length) % this.images.length;
  }
}