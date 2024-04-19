import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileDataService {

  private selectedFile:any;

  constructor() { }

  setSelectedFile(file: any) {
    this.selectedFile = file;
  }

  getSelectedFile(): any {
    return this.selectedFile;
  }

}
