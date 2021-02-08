import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl('')
  });
  
  constructor(
    private _router: Router,
    private service: NotificationsService
  ) {}

  ngOnInit(): void {
  }

  onError(message){
    this.service.error(null, message, {
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true,
      clickToClose: true
    });
  }

  loginUser(){
    if(this.loginForm.value.user == "admin" && this.loginForm.value.password == "admin"){
      this._router.navigate(['/dashboard']);
    }else{
      this.onError("Authentication failed.")
    }
  }

}
