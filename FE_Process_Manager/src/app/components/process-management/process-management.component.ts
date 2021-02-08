import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Process } from 'src/app/models/process';
import { ProcessService } from '../../services/process.service'

@Component({
  selector: 'app-process-management',
  templateUrl: './process-management.component.html',
  styleUrls: ['./process-management.component.css']
})
export class ProcessManagementComponent implements OnInit {
  public oneProcess: any;
  public process: Process[] = [];
  displayedColumns: string[] = ['id', 'ip', 'mac', 'name', 'device_id', 'docker_id', 'pid', 'status', 'action'];

  dataSource = new MatTableDataSource<Process>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private service: ProcessService
  ) {
  }

  ngOnInit(): void {
    this.getProcessInfo();
  }

  getProcessInfo(){
    this.service.getProcess().subscribe(data => {
      console.log(data);

      this.process = data;
      this.dataSource = new MatTableDataSource<Process>(this.process);
      this.ngAfterViewInit();
    })
  }

  editRunning(id: number){


    this.service.getOne(id).subscribe(data => {
      this.oneProcess = data;
      this.oneProcess as Process;
      this.oneProcess.status = "Running";
      console.log(this.oneProcess.status);
      this.service.editProcess(id, this.oneProcess).subscribe(res => {
        window.location.reload();
      })
    });
  }

  editStop(id: number){
    this.service.getOne(id).subscribe(data => {
      this.oneProcess = data;
      this.oneProcess as Process;
      this.oneProcess.status = "Stop";
      console.log(this.oneProcess.status);
      this.service.editProcess(id, this.oneProcess).subscribe(res => {
        window.location.reload();
      })
    });
  }

}

