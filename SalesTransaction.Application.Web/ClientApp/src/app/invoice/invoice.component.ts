import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { MvSales } from '../sales/sales.model';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { MvInvoice } from './invoice.model';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvInvoice>
  sales: MvSales[] = [];
  errorMessages = '';
  selectedInvoice: MvInvoice = <MvInvoice>{};
  selection = new SelectionModel<MvInvoice>(false, []);

  constructor(private invoiceService: InvoiceService,
    private snackBar: SnackbarService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.displayedColumns = ['invoiceId', 'customerId', 'firstName', 'lastName', 'amount', 'date'];
    this.getAllInvoice();
  }

  getAllInvoice() {
    this.invoiceService.getAllInvoice().subscribe(
      (data: any) => {
        if (data) {
          this.dataSource = new MatTableDataSource<MvInvoice>(data);
        } else {
          this.dataSource = new MatTableDataSource<MvInvoice>();
          this.errorMessages = 'No records found';
        }
      }
    );
  }

  rowClick(event: any, row: MvInvoice) {
    this.selectedInvoice = { ...row };
    this.selection.toggle(row);
  }

  getInvoiceDetail(): void {
    if (!this.selection.hasValue()) {
      this.snackBar.openSnackBar('No invoice selected', 'warning');
      return;
    }

    this.invoiceService.getInvoiceSales(this.selectedInvoice.invoiceId).subscribe(result => {
      if (result) {
        this.sales = result;
      }

      const dialogRef = this.dialog.open(InvoiceDetailComponent, {
        width: '600px',
        data: {
          invoice: this.selectedInvoice,
          invoiceSales: this.sales
        }
      });
      dialogRef.afterClosed().subscribe(message => {
        if (message === 'print') {
          this.snackBar.openSnackBar('Invoice Printed', 'success');
        }
      });
    });
  }
}
