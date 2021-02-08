import { MatCardModule } from '@angular/material/card';
import { logging } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PCDockerInfo } from 'src/app/models/pc-docker-info';
import { PcDockerService } from '../../services/pc-docker.service';
import { DialogPcDockerComponent } from '../dialog-components/dialog-pc-docker/dialog-pc-docker.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
  selector: 'app-pc-docker',
  templateUrl: './pc-docker.component.html',
  styleUrls: ['./pc-docker.component.css']
})
export class PcDockerComponent implements OnInit {
  public info: PCDockerInfo[] = [];
  public oneInfo: PCDockerInfo[] = [];
  pcDockers: any;
  isPopupOpened = true;
  data1 =[];
  displayedColumns: string[] = ['ip', 'mac', 'docker_id', 'docker_name', 'port_local', 'port_forward', 'action'];
  dataSource = new MatTableDataSource<PCDockerInfo>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private service: PcDockerService,
    private dialog?: MatDialog,
    private fireStore: AngularFirestore
  ) {
  }

  ngOnInit(): void {
    // this.getInfo();
    this.getInfoFirebase();
  }

  getInfo(){
    this.service.getPCDocker().subscribe(data => {
      console.log(data);
      
      this.info = data;
      this.dataSource = new MatTableDataSource<PCDockerInfo>(this.info);
      this.ngAfterViewInit();
    })
  }

  createNewInfo(){
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(DialogPcDockerComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  editInfo(id: number){
    console.log(id);
    this.isPopupOpened = true;
    this.service.getOne(id).subscribe(data => {
      this.oneInfo = data;
      const dialogRef = this.dialog.open(DialogPcDockerComponent, {
        data: this.oneInfo
      });
    })

  }

  deleteInfo(id: number){
    if(confirm("You want delete this info?")){
      this.service.deletePCDocker(id).subscribe(data => {
        window.location.reload();
        console.log(id);
      })
    }
  }

  getInfoFirebase() {
    this.fireStore.collection('DockerManager').snapshotChanges().subscribe(data =>{      
      data.forEach(a => {
       const data = a.payload.doc.data();
        console.log(a.payload.doc.id);
       this.data1.push(data);
      //  console.log(this.data1);
        this.info = this.data1;
        this.dataSource = new MatTableDataSource<PCDockerInfo>(this.info);
      this.ngAfterViewInit();
      })
    })
  } 
  

  deleteInfoFirebase(mac) {
    console.log(mac)
    // if(confirm("You want delete this info ?")){
    //   this.service.deletePCDockerFirebase(mac);
    //   // this.fireStore.doc('DockerManager/' + mac).delete();
    //   window.location.reload();
    // 
    const item = this.fireStore.doc('dockerManager/nsYRTVVTNKB1ts8uGABI')
    console.log(item);
  }
}

