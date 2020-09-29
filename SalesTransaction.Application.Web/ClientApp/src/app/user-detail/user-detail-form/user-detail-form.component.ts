import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvUserDetail } from '../user-detail.model';

@Component({
  selector: 'app-user-detail-form',
  templateUrl: './user-detail-form.component.html',
  styleUrls: ['./user-detail-form.component.scss']
})
export class UserDetailFormComponent implements OnInit, AfterViewInit {

  action: string;
  selectedUser: MvUserDetail = <MvUserDetail>{};
  userForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<UserDetailFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder) {
    dialogRef.disableClose = true;
    this.action = data.action;
    this.selectedUser = data.data || {};
  }

  ngAfterViewInit() {
    this.userForm.updateValueAndValidity();
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required]
    });
  }

  cancelClick() {
    this.dialogRef.close();
  }

  submitForm() {
    this.dialogRef.close(this.selectedUser);
  }



}
