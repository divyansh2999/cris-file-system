import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient,HttpClientModule,HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  baseUrl = 'http://192.168.1.169:1100';
  httpclient: any;
  
  private selectedFileSubject = new Subject<File | null>();
  selectedFile$ =this.selectedFileSubject.asObservable();
  router: any;
  selectedFile: any;

  sendSelectedFile(selectedFile:File){
    this.selectedFileSubject.next(selectedFile);
  }

  isLoggedIn(): boolean {
    return true;
  }

  constructor(private http:HttpClient, router:Router,
    handler:HttpBackend) { 
      this.http = new HttpClient(handler)
}

insertMarkedFiles(markedFiles: any[]): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/assign`, { markedFiles });
}

insertSelectedEmp(selectedEmpName:string):Observable<any>{
  return this.http.post<any>(`${this.baseUrl}/assign`,{ selectedEmpName });
}
insertData(dataToSend:any):Observable<any>{
  return this.http.post<any>(`${this.baseUrl}/assign`,{ dataToSend })
}
insertMomsData(fileName:any,receivingdate:any,title:any):Observable<any>{
  return this.http.post<any>(`${this.baseUrl}/meeting`,{ fileName,receivingdate,title})
}
updateFileStatus(fileUpdate:any):Observable<any>{
  return this.http.put<any>(`${this.baseUrl}/assign`,{ fileUpdate });

  }

  public uploadfile(file: any, title, receivingdate) {
    let formParams = new FormData();
    formParams.append('title', title);
    formParams.append('receivingdate', receivingdate);
    formParams.append('upfile', file);
    return this.http.post<any>(`${this.baseUrl}/meeting`, formParams)
  }

updateApprovedDate(fileDateUpdate:any):Observable<any>{
  return this.http.put<any>(`${this.baseUrl}/assign`,{ fileDateUpdate});
  }
  
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`
    );
  }

}



uploadSingleFile = (formData:any)=>{
return this.http.post(`${this.baseUrl}/uploadfile`,formData)
}

uploadArrayOfFiles =(formData:any)=>{
  return this.http.post(`${this.baseUrl}/uploadFiles`,formData)
}

getChartDatas=()=>{
  return this.http.get(`${this.baseUrl}/getdatas`);
}

getEmpData=()=>{
  return this.http.get(`${this.baseUrl}/emp`);
}
getNoOfFiles=()=>{
  return this.http.get(`${this.baseUrl}/assign`);
}
getTrackLinedata=()=>{
  return this.http.get(`${this.baseUrl}/trackline`);
}
getMeetingData=()=>{
  return this.http.get(`${this.baseUrl}/meeting`);
}
getData=()=>{
  return this.http.get<any>(`${this.baseUrl}/assign`);
}
redirectTo(url: string): void {
  // When skipLocationChange true, navigates without pushing a new state into history.
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([url]);
  });
}





}


  
