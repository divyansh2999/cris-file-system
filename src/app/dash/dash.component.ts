import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { AgChartOptions, AgCharts } from "ag-charts-community";
import { EmitType } from '@syncfusion/ej2-base';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Chart, Colors, registerables } from 'chart.js';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,MatCardModule, CanvasJSAngularChartsModule, RouterLink, CommonModule,AgChartsAngularModule, MatTooltipModule],
  providers: [HttpClientModule, DataService],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss', 
  animations: [
    trigger('flipInOut', [
      state('in', style({
        transform: 'rotateY(0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'rotateY(180deg)',
        opacity: 0
      })),
      transition('in => out', [
        animate('0.65s')
      ]),
      transition('out => in', [
        animate('0.65s')
      ])
    ])
  ]
})

export class DashComponent implements OnInit {

  tooltipText: string = '';
  tooltipTextV1: string = 'Attribute Info';
  tooltipTextV2: string = 'Topological Error';
  tooltipTextV3: string = 'LRS Process';
  tooltipTextV4: string = 'Overall Verification';
  tooltipTextV5: string = 'File Delivered';

  public path: Object = {
    saveUrl: 'http'
  }
  isHovering: boolean[] = [false, false, false];
  toggleHovering(index: number) {
    this.isHovering[index] = !this.isHovering[index];
  }
  public options: AgChartOptions = {};
  backend: any[] = [];
  frontend: any[] = [];
  dataArray: any = []
  UploadedFiles: any[] = [];
  numberOfFiles: any = [];
  chart: any;
  selectedFile: any;
  assignedData: any = [];
  ap:any=0;
  showApContainer:boolean=false;
  showDefContainer:boolean=true;
  nysFiles: any = [];
  pendingFiles: any = [];
  completedFiles: any = [];
  approvedFiles: any = [];
  validation1: any = [];
  validation2: any = [];
  validation3: any = [];
  validation4: any = [];
  validation5: any = [];
  item: any
  nys: any;
  pending: any
  completed: any;
  approved: any;
  arrayData: any = [];
  nysPercentage: any;
  pendingPercentage: any;
  completedPercentage: any;
  valid1Percentage: any;
  valid2Percentage: any;
  valid3Percentage: any;
  valid4Percentage: any;
  valid5Percentage: any;
  valid1Int: any;
  valid2Int: any;
  valid3Int: any;
  valid4Int: any;
  valid5Int: any;
  example = 'Example'
  spread: any;
  nysInt: any;
  pendingInt: any;
  completedInt: any;
  i: any;
  constructor(private dataservice: DataService) { }
  selectN(filename: any): void {
    let selectOnCLickN = this.assignedData.find((item: any) => item.filename === filename);
    console.log(selectOnCLickN.employee_assigned);
    this.tooltipText = selectOnCLickN.employee_assigned;
    setTimeout(() => {
      this.resetTooltipText();
    }, 8000)
  }
  selectP(filename: any): void {
    let selectOnCLickP = this.assignedData.find((item: any) => item.filename === filename);
    console.log(selectOnCLickP.employee_assigned);
    this.tooltipText = selectOnCLickP.employee_assigned;
    setTimeout(() => {
      this.resetTooltipText();
    }, 8000)
  }
  selectC(filename: any): void {
    let selectOnCLickC = this.assignedData.find((item: any) => item.filename === filename);
    console.log(selectOnCLickC.employee_assigned);
    this.tooltipText = selectOnCLickC.employee_assigned;
    setTimeout(() => {
      this.resetTooltipText();
    }, 8000)
  }
  ngOnInit(): void {
    this.getAssignedData();
    this.plotChart()
    setTimeout(() => {
      this.plotChart()
    }, 100)
    Chart.register(...registerables);
    setTimeout(() => {
      this.calculatePercentages();
    }, 500)
    this.calculatePercentages()
    console.log(this.approvedFiles)
  }
  resetTooltipText = () => {
    this.tooltipText = '';
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
          if (items.status === "Attribute Info. Verified") {
            this.pendingFiles.push(items)
          }
          if (items.status === "Topological Error Verified") {
            this.pendingFiles.push(items)
          }
          if (items.status === "LRS Process Completed") {
            this.pendingFiles.push(items)
          }
          if (items.status === "Overall Verification Completed") {
            this.pendingFiles.push(items)
          }
          if (items.status === "File Delivered") {
            this.pendingFiles.push(items)
          }
          if (items.status === "Attribute Info. Verified") {
            this.validation1.push(items);
          }
          if (items.status === "Topological Error Verified") {
            this.validation2.push(items);
          }
          if (items.status === "LRS Process Completed") {
            this.validation3.push(items);
          }
          if (items.status === "Overall Verification Completed") {
            this.validation4.push(items);
          }
          if (items.status === "File Delivered") {
            this.validation5.push(items);
          }
          if (items.status === "Not yet started") {
            this.nysFiles.push(items);
          }
          if (items.status === "Completed") {
            this.completedFiles.push(items);
          }
          if (items.status === "File Approved") {
            this.approvedFiles.push(items);
          }
        })
        this.nys = this.nysFiles.length;
        this.pending = this.pendingFiles.length;
        this.completed = this.completedFiles.length;
        this.approved = this.approvedFiles.length;
        this.arrayData = [
          {
            status: 'Completed Files', count: this.completed
          },
          {
            status: 'Approved Files', count: this.approved
          }
        ]
        console.log(this.arrayData);
        console.log("Data has been stored in array assignedData and listed as:-", this.assignedData)
      })
  }
  calculatePercentages() {
    const totalFiles = this.assignedData.length;
    const nysF = this.nysFiles.length;
    const pendingF = this.pendingFiles.length;
    const completedF = this.completedFiles.length;
    const valid1 = this.validation1.length;
    const valid2 = this.validation2.length;
    const valid3 = this.validation3.length;
    const valid4 = this.validation4.length;
    const valid5 = this.validation5.length;
    console.log(valid1)
    console.log(valid2)
    console.log(valid3)
    console.log(valid4)
    console.log(valid5)
    this.nysPercentage = (nysF / totalFiles) * 100;
    this.pendingPercentage = (pendingF / totalFiles) * 100;
    this.completedPercentage = (completedF / totalFiles) * 100;
    this.valid1Percentage = (valid1 / pendingF) * 100;
    this.valid2Percentage = (valid2 / pendingF) * 100;
    this.valid3Percentage = (valid3 / pendingF) * 100;
    this.valid4Percentage = (valid4 / pendingF) * 100;
    this.valid5Percentage = (valid5 / pendingF) * 100;
    this.valid1Int = Math.round(this.valid1Percentage)
    this.valid2Int = Math.round(this.valid2Percentage)
    this.valid3Int = Math.round(this.valid3Percentage)
    this.valid4Int = Math.round(this.valid4Percentage)
    this.valid5Int = Math.round(this.valid5Percentage)
    this.nysInt = Math.floor(this.nysPercentage)
    this.pendingInt = Math.floor(this.pendingPercentage)
    this.completedInt = Math.floor(this.completedPercentage)
  }
  renderChart(canvasId: string, label: string, percentage: number, color: string) {
    new Chart(canvasId, {
      type: 'doughnut',
      data: {
        labels: [label],
        datasets: [{
          data: [percentage, 100 - percentage],
          backgroundColor: [color, '#999797']
        }]
      },
      options: {
        cutout: '70%',
        hover: {
          mode: 'x',
          intersect: false
        },
        plugins: {
          legend: {
            display: false
          },
        }
      }
    });
  }
  plotChart = () => {
    const datapoint = this.arrayData.map((item: { status: any; count: any; }) => (
      {
        asset: item.status,
        process: item.count
      }
    ))
    this.options = {
      data: datapoint,
      title: {
        text: "Project Status",
      },
      series: [
        {
          type: "pie",
          angleKey: "process",
          legendItemKey: "asset",
          fills: [ '#8DCE7A', '#517BE5'], 
          strokes: [ '#8DCE7D', '#517BE7'], 
          strokeWidth: 2 
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
  // utils for formatting date
  formatDate(date: number) {
    const day = String(new Date(date).getDate()).padStart(2, '0');
    const month = String(new Date(date).getMonth() + 1).padStart(2, '0'); // Months are zero-based
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
        const fileUrl = file.webkitRelativePath;
        this.UploadedFiles.push({
          name: fileName,
          size: fileSize,
          extension: fileExtension,
          filePath: fileUrl,
        })
        console.log(file.webkitRelativePath)
      }
    }
    this.dataservice.uploadArrayOfFiles(formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.UploadedFiles = data.data.fileDetails;
        this.numberOfFiles = data.data.fileDetails.length;
      },
    })
  }
  deleteRow(index: number): void {
    this.UploadedFiles.splice(index, 1);
  }
  edit(ind: number): void {
    this.selectedFile = this.UploadedFiles.filter((index) => index === ind)
  }
    toggleContainer=()=>{
      this.showApContainer = !this.showApContainer;
      this.showDefContainer = !this.showDefContainer;
    }
}

