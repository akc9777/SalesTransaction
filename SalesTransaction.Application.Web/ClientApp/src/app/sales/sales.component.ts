import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { MvSales } from './sales.model';
import { SalesService } from './sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvSales>;
  errorMessages = '';
  selectedSales: MvSales = <MvSales>{};
  selection = new SelectionModel<MvSales>(false, []);
  selectionCheckbox = new SelectionModel<MvSales>(true, []);

  constructor(private salesService: SalesService,
    private snackBar: SnackbarService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.displayedColumns = ['select', 'salesId', 'name', 'rate', 'quantity', 'total', 'insertDate'];
    this.getAllSales();
  }

  getAllSales() {
    this.salesService.getAllSales().subscribe(
      (data: any) => {
        if (data) {
          this.dataSource = new MatTableDataSource<MvSales>(data);
        } else {
          this.dataSource = new MatTableDataSource<MvSales>();
          this.errorMessages = 'No relevant data to display';
        }
      }
    );
  }

  rowClick(e: any, row: MvSales) {
    this.selectedSales = { ...row }
    this.selection.toggle(row);
  }

  editSales() {
    this.openDialog('edit');
  }

  addSales() {
    this.selection.clear();
    this.selectedSales = <MvSales>{};
    this.openDialog('add');
  }

  openDialog(action: string) {
    if (action === 'edit' && !this.selection.hasValue()) {
      this.snackBar.openSnackBar('No Sales Selected', 'warning');
      return;
    }

    const dialogRef = this.dialog.open(SalesFormComponent, {
      width: '300px',
      data: { data: this.selectedSales, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedSales = result;

        if (action === 'edit') {
          this.salesService.editSales(result).subscribe(result => {
            this.snackBar.openSnackBar('Sales Updated', 'success');
            this.getAllSales();
          });
        } else {
          this.salesService.addSales(result).subscribe(result => {
            this.snackBar.openSnackBar('Sales Added', 'success');
            this.getAllSales();
          })
        }
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selectionCheckbox.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }
  
  masterToggle() {
    this.isAllSelected() ?
        this.selectionCheckbox.clear() :
        this.dataSource.data.forEach(row => this.selectionCheckbox.select(row));
  }
}
