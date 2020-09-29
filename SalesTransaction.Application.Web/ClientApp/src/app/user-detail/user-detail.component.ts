import { Component, OnInit } from '@angular/core';
import { MvUserDetail } from './user-detail.model';
import { UserDetailService } from './user-detail.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MvProduct } from '../product/product.model';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailFormComponent } from './user-detail-form/user-detail-form.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  tableColumns: string[];
  dataSource: MatTableDataSource<MvUserDetail>;
  errorMessage = '';
  selectedUser: MvUserDetail = <MvUserDetail>{};
  selection = new SelectionModel<MvUserDetail>(false, []);

  constructor(private userDetailService: UserDetailService,
    private snackBar: SnackbarService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.tableColumns = ['customerId', 'firstName', 'lastName', 'username'];
    this.getAllUsers();
  }

  getUserDetail() {

    const customerId = parseInt(localStorage.getItem('customerId'), 10);
    this.userDetailService.getUserDetail(customerId).subscribe((data: any) => {
      if (data) {
        this.dataSource = new MatTableDataSource<MvUserDetail>(data);
      } else {
        this.dataSource = new MatTableDataSource<MvUserDetail>();
        this.errorMessage = 'No relevant data present in system';
      }
    });
  }

  getAllUsers() {
    this.userDetailService.getAllUserDetail().subscribe((data: any) => {
      if (data) {
        this.dataSource = new MatTableDataSource<MvUserDetail>(data);
      } else {
        this.dataSource = new MatTableDataSource<MvUserDetail>();
        this.errorMessage = 'No relevant data present in system';
      }
    });
  }

  rowClick(e: any, row: MvUserDetail) {
    this.selectedUser = { ...row };
    this.selection.toggle(row);
  }

  addUser() {
    this.selection.clear();
    this.selectedUser = <MvUserDetail>{};
    this.openDialog('add');
  }

  editUser() {
    this.openDialog('edit');
  }

  openDialog(action: string) {
    if (action === 'edit' && !this.selection.hasValue()) {
      this.snackBar.openSnackBar('No user selected', 'warning');
      return;
    }

    const dialogRef = this.dialog.open(UserDetailFormComponent, {
      width: '300px',
      data: { data: this.selectedUser, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedUser = result;

        if (action === 'edit') {
          this.userDetailService.editUser(result).subscribe(result => {
            this.snackBar.openSnackBar('User updated', 'success');
            this.getAllUsers();
          });
        } else {
          this.userDetailService.addUser(result).subscribe(result => {
            this.snackBar.openSnackBar('User Added', 'success');
            this.getAllUsers();
          });
        }
      }

    });
  }
}
