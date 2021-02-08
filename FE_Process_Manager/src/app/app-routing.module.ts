import { PcDockerComponent } from './components/pc-docker/pc-docker.component';
import { ProcessManagementComponent } from './components/process-management/process-management.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, children:
    [
      { path: '', redirectTo: 'process-management', pathMatch: 'full' },
      { path: 'process-management', component: ProcessManagementComponent },
      { path: 'pc-docker', component: PcDockerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
