import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { response } from 'express';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatDatepickerModule, MatNativeDateModule,
    MatFormField, FormsModule,
    NavbarComponent,
    MatCardModule,
    CanvasJSAngularChartsModule,
    RouterLink,
    CommonModule,
    AgChartsAngularModule,
    MatTooltipModule, MatInputModule, MatFormFieldModule],
  providers: [HttpClientModule, DataService, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
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
    ]),
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(-50%)'
      })),
      state('out', style({
        transform: 'translateX(0%)'
      })),
      transition('in => out', animate('700ms ease-out')),
      // transition('out => in', animate('400ms ease-in'))
    ])
  ]

})
export class DashboardComponent implements OnInit {
  momsFiles: any = [];
  moment(arg0: any) {
    throw new Error('Method not implemented.');
  }
  showAlert = (alertText: any) => {
    Swal.fire({
      title: 'Success',
      text: alertText,
      icon: 'success',
      confirmButtonText: 'OK',
      width: '25.9em',
      timer: 2000
    });
  } 
  inputValue: string;

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('picker') picker: ElementRef;
  @ViewChild('textInput') textInput: ElementRef;
  docType:any;
  version:any;
  selectedProjectType: string;
  selectedVersion: string;
  tooltipText: string = '';
  tooltipTextV1: string = 'Attribute Info';
  tooltipTextV2: string = 'Topological Error';
  tooltipTextV3: string = 'LRS Process';
  tooltipTextV4: string = 'Overall Verification';
  tooltipTextV5: string = 'File Delivered';
  trackLineData: any = []
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
  ap: any = 0;
  showApContainer: boolean = false;
  showDefContainer: boolean = true;
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
  templateValue: boolean = false;
  importedVariable: any;
  temp3Variable: any;
  toggle: boolean = false;
  file: File;
  fileName: any;
  fileSizeInBytes: any;
  fileExtension: any;
  fileUrl: any;
  fileSize: any;
  date = new Date();
  selectedDate: Date;
  title: string = '';
  filename: any;
  momsData: any = [];
  documentContainer: boolean = false;
  versionContainer: boolean = false;
  browseVariable: boolean = false;

  constructor(private dataservice: DataService, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
    // $('#template1').hide();
    // $('#template2').show();
    $('#template1').hide();
    $('#template2').hide();
    $('#template3').hide();
    $('#options').hide();
    this.getAssignedData();
    this.loadMoMsData();
    this.getTrackLineData();
    this.plotChart()
    setTimeout(() => {
      this.plotChart();
    }, 100)
    Chart.register(...registerables);
    setTimeout(() => {
      this.calculatePercentages();
      this.renderCharts();
    }, 500)
    setTimeout(() => {
      this.loadRoutingParams();
    }, 20)
    this.calculatePercentages()
    this.loadExportedVariable()
    this.loadtemplate3Variable()
    console.log(this.title)
  }

  loadRoutingParams = () => {
    this.route.params.subscribe(params => {
      if (params['variable'] === 'true' || params['data'] == 'true') {
        $('#template2').hide();
        $('#template1').show();
        $('#template3').hide();
      }
      else if (params['template3Variable'] === 'true') {
        $('#template1').hide();
        $('#template2').hide();
        $('#template3').show();
      }
      else {
        $('#template2').show();
        $('#template1').hide();
        $('#template3').hide();
      }
    });
  }
  loadExportedVariable = () => {
    this.route.params.subscribe(params => {
      this.importedVariable = params['data'];
      console.log('Imported Variable is ', this.importedVariable);
    })
  }
  loadtemplate3Variable = () => {
    this.route.params.subscribe(params => {
      this.temp3Variable = params['template3Variable'];
      console.log('Template3 variable is ', this.temp3Variable)
    })
  }

  selectN(filename: any): void {
    let selectOnCLickN = this.assignedData.find((item: any) => item.filename === filename);
    this.tooltipText = selectOnCLickN.employee_assigned;
    setTimeout(() => {
      this.resetTooltipText();

    }, 8000)
  }
  resetTooltipText = () => {
    this.tooltipText = '';
  }

  loadMoMsData = () => {
    fetch('http://192.168.1.169:1100/meeting')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network issue');
        }
        return response.json();
      })
      .then(data => {
        this.momsData = data.data;

      })
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
        this.nys = Math.round(this.nysFiles.length);
        this.pending = Math.round(this.pendingFiles.length);
        this.completed = Math.round(this.completedFiles.length);
        this.approved = Math.round(this.approvedFiles.length);
        this.arrayData = [
          {
            status: 'Not Started', count: this.nys
          },
          {
            status: 'Processing', count: this.pending
          },
          {
            status: 'Completed', count: this.completed
          },
          {
            status: 'Approved', count: this.approved
          }
        ]
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
  renderCharts() {
    this.renderChart('Validation1', 'Stage 1', this.valid1Int, 'rgb(255, 99, 132)');
    this.renderChart('Validation2', 'Stage 2', this.valid2Int, 'rgb(185, 117, 185)');
    this.renderChart('Validation3', 'Stage 3', this.valid3Int, 'rgb(75, 192, 192)');
    this.renderChart('Validation4', 'Stage 4', this.valid4Int, 'rgb(75, 136, 216)');
    this.renderChart('Validation5', 'Stage 5', this.valid5Int, 'rgb(117, 90, 238)');
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
    const datapoint = this.arrayData.map((item: { status: any; count: number; }) => (
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
          fills: ['#FF5711', '#999797', '#8DCE7A', '#517BE5'],
          strokes: ['#FF5750', '#999799', '#8DCE7D', '#517BE7'],
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
    try {
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          this.file = files[i];
          this.fileName = this.file.name;
          this.fileSizeInBytes = this.file.size;
          this.fileSize = this.convertFileSize(this.fileSizeInBytes)
          this.fileExtension = this.file.name.split('.').pop();
          this.fileUrl = this.file.webkitRelativePath;

          this.UploadedFiles.push({
            name: this.fileName,
            size: this.fileSize,
            extension: this.fileExtension,
            filePath: fileUrl,
          })

        }
      }

    }
    catch (err) {
      console.log(err)
    }

    this.dataservice.uploadArrayOfFiles(formData).subscribe({
      next: (data: any) => {
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
  toggleContainer = () => {
    this.showApContainer = !this.showApContainer;
    this.showDefContainer = !this.showDefContainer;
  }
  //fetching Trackline data
  getTrackLineData = () => {
    fetch('http://192.168.1.169:1100/trackline')
      .then(response => {
        if (!response.ok) {
          throw new Error('TrackLine data not fetched');
        }
        return response.json();
      })
      .then(data => {
        this.trackLineData = data.data;
        console.log('TrackLine data is', this.trackLineData);
      })
  }
  showOptions = () => {
    this.toggle = !this.toggle;
    if (this.toggle === true) {
      $('#options').show();
    }
    else {
      $('#options').hide();
    }
  }

  sendUploadedData = () => {
    const dataToSend = {
      file: this.fileName
    }
  }

  
  clearFields() {
    // Clear the date input and text input fields
    this.selectedDate = null;
    this.inputValue = '';

    // Reset the date input value
    if (this.picker && this.picker.nativeElement) {
      this.picker.nativeElement.value = null;
    }

    // Reset the text input value
    if (this.textInput && this.textInput.nativeElement) {
      this.textInput.nativeElement.value = '';
    }

    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }

  }
 

  onFilechange(event: any) {
    this.file = event.target.files[0];
    $('#submitBtn').show();
  }

  downloadFile(ptah) {
    const link = document.createElement('a');
    link.href = ptah;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(ptah);
  }

  sendData = () => {
    console.log('Inside  sendData method')

    // console.log(dataToSend)
    if (this.file && this.selectedDate) {
      if (this.file) {
        this.dataservice.uploadfile(this.file, this.title, this.selectedDate).subscribe(resp => {
          console.log('File inserted successfully(Frontend)')
          let alertText = 'File successfully saved';
          this.clearFields();
          this.loadMoMsData();
          this.showAlert(alertText);
        })
      } 
      else {
        alert("Please select a file first")
      }
    }
    else {
      console.log(this.file, this.selectedDate, this.title)
      console.log('Missing something');
    }

  }
  sendDocumentData = () => {
    if (this.file && this.docType && this.version) {
      if (this.file) {
        this.dataservice.uploadfile(this.file, this.docType, this.version).subscribe(resp => {
          console.log('Document data inserted successfully(Frontend)')
          let alertText = 'Document successfully saved';
          this.clearFields();
          // this.loadMoMsData();
          this.showAlert(alertText);
        })
      } 
      else {
        alert("Please select a file first")
      }
    }
    else {
      console.log(this.file, this.selectedDate, this.title)
      console.log('Missing something');
    }

  }
  showUploadContainer = () => {
    this.documentContainer = true;

    if (this.documentContainer === true) {
      $('#documentUploadContainer').show()
    }
    else {
      $('#documentUploadContainer').hide()

    }
  }
  selectVersion = () => {
    this.versionContainer = true;
    if (this.versionContainer === true) {
      $('.documentVersion').show();
    }
    else {
      $('.documentVersion').hide();
    }
  }

  showBrowseBtn = () => {
    this.browseVariable = true;
    if (this.browseVariable === true) {
      $('. documentUpload').show();
    }
  }
  

  selectDocType(event: any) {
    this.selectedProjectType = event.target.value;
    // console.log('Selected project type:', this.selectedProjectType);
    this.docType = this.selectedProjectType
    console.log('docType is ',this.docType)
  }
  selectversion(event: any) {
    this.selectedVersion = event.target.value;
    // console.log('Selected project type:', this.selectedProjectType);
    this.version = this.selectedVersion
    console.log( this.docType,' version is ',this.version)
  }
}
