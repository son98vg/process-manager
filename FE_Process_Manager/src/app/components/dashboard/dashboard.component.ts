import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(
    private _router: Router
  ) { }

  listNavItems: any[];

  handleProcessItemClick(): void {
    (document.getElementById("live-item") as HTMLImageElement).src = "assets/images/icon-sidebar-1-after.svg";
    (document.getElementById("pc-docker-item") as HTMLImageElement).src = "assets/images/icon-sidebar-2.svg";
  }

  handlePCAndDockerItemClick(): void {
    (document.getElementById("live-item") as HTMLImageElement).src = "assets/images/icon-sidebar-1.svg";
    (document.getElementById("pc-docker-item") as HTMLImageElement).src = "assets/images/icon-sidebar-2-after.svg";
  }

  ngOnInit(): void {
    
  }

  logout(){
    this._router.navigate(['/login'])
  }

}
