import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Process } from '../models/process';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'my-auth-token'
  }),

}
@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  mockUrl:string = 'http://localhost:5000/process';

  constructor(private http: HttpClient) { }

  public getProcess(){
    return this.http.get<Process[]>(this.mockUrl, httpOptions)
  }

  public getOne(id: number){
    return this.http.get<Process[]>(this.mockUrl + '/' + id, httpOptions)
  }

  public editProcess(id: number ,data: Process){
    return this.http.put<any>(this.mockUrl + '/' + id, data, httpOptions)
  }
}
