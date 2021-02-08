import { PCDockerInfo } from 'src/app/models/pc-docker-info';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { rejects } from 'assert';
import { ThrowStmt } from '@angular/compiler';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'my-auth-token'
  }),

}
@Injectable({
  providedIn: 'root'
})
export class PcDockerService {
  items: Observable<PCDockerInfo[]>;

  mockUrl:string = 'http://localhost:5000/dockerManager';

  constructor(private http: HttpClient,
    private firestore: AngularFirestore
    ) 
    {
      // this.items = this.firestore.collection('DockerManager').snapshotChanges().subscribe(changes => {
      //   return changes.map(a => {
      //     const data = a.payload.doc.data() as PCDockerInfo;
      //     data.id = a.payload.doc.id;
      //     console.log(data);itemDoc
      // });
     }

  public addPCDocker(data: PCDockerInfo){
    return this.http.post<PCDockerInfo[]>(this.mockUrl, data, httpOptions)
  }

  public getPCDocker(){
    return this.http.get<PCDockerInfo[]>(this.mockUrl, httpOptions)
  }

  public getOne(id: number){
    return this.http.get<PCDockerInfo[]>(this.mockUrl + '/' + id, httpOptions)
  }

  public deletePCDocker(id: number){
    return this.http.delete<any>(this.mockUrl + '/' + id, httpOptions)
  }

  public editPCDocker(id: number, data: PCDockerInfo){
    return this.http.put<any>(this.mockUrl + '/' + id , data, httpOptions)
  }

  public addPCDockerFirebase(data) {
    return this.firestore.collection('DockerManager')
    .add(data)
    .then( res => {}, err => rejects(err))
  }
  public getPCDockerFirebase() {
    return this.firestore.collection('DockerManager').snapshotChanges();
    // return this.items
  }
  public editPCDockerFirebase(dataId, data) {
    return this.firestore.doc('DockerManager'+ dataId).update(data)
  }
  public deletePCDockerFirebase(data : PCDockerInfo) {
     const item = this.firestore.doc('DockerManager/2').delete()
     
  }
}

