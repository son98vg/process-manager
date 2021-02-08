import { PCDockerInfo } from './../../../models/pc-docker-info';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PcDockerService } from 'src/app/services/pc-docker.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-pc-docker',
  templateUrl: './dialog-pc-docker.component.html',
  styleUrls: ['./dialog-pc-docker.component.css']
})
export class DialogPcDockerComponent implements OnInit {

  public infoForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogPcDockerComponent>,
    private service: PcDockerService,
    private fireStore: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: PCDockerInfo
  ) { }

  ngOnInit() {
    this.infoForm = this._formBuilder.group({
      id: this.fireStore.createId(),
      ip: [this.data.ip, [Validators.required]],
      mac: [this.data.mac, [Validators.required]],
      docker_id: [this.data.docker_id, [Validators.required]],
      docker_name: [this.data.docker_name, [Validators.required]],
      port_local: [this.data.port_local, [Validators.required]],
      port_forward: [this.data.port_forward, [Validators.required]],
    });
  }

  onSubmit() {
    if (isNaN(this.data.id)){
    console.log(this.infoForm.value);
    this.service.addPCDockerFirebase(this.infoForm.value).then(res =>{
      console.log(res)
      this.dialogRef.close();
     window.location.reload();
    })
  }
    if (isNaN(this.data.id)) {
      this.service.addPCDocker(this.infoForm.value).subscribe(res => {
        this.dialogRef.close();
        window.location.reload();
        console.log(this.infoForm);
      });
    } else {
      this.service.editPCDocker(this.data.id, this.infoForm.value).subscribe(res => {
        this.dialogRef.close();
        window.location.reload();
      });
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
