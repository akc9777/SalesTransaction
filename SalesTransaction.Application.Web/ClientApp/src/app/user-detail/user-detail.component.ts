import { Component, OnInit } from '@angular/core';
import { MvUserDetail } from './user-detail.model';
import { UserDetailService } from './user-detail.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  tableColumns: string[];
  dataSource: MvUserDetail[] = [];
  errorMessage = '';

  constructor(private userDetail: UserDetailService) { }

  ngOnInit() {
    this.tableColumns = ['customerId', 'firstName', 'lastName', 'email'];
    this.getUserDetail();
  }

  getUserDetail() {
    // tslint:disable-next-line: radix
    const customerId = parseInt(localStorage.getItem('customerId'));
    this.userDetail.getUserDetail(customerId).subscribe((data: any) => {
      if (data) {
        this.dataSource = [data];
      } else {
        this.errorMessage = 'No data found';
      }
    });
  }

  getAllUsers() {
    this.userDetail.getAllUserDetail().subscribe((data: any) =>{
      if (data) {
        this.dataSource = data;
      } else {
        this.dataSource = [];
        this.errorMessage = 'No data found';
      }
    });
  }
}
