import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvSales } from 'src/app/sales/sales.model';
import { MvInvoice } from '../invoice.model';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  invoice: MvInvoice = <MvInvoice>{};
  invoiceSales: MvSales[] = [];


  constructor(public dialogRef: MatDialogRef<InvoiceDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.invoiceSales = this.data.invoiceSales;
    this.invoice = this.data.invoice;
    console.log(this.invoiceSales);
  }

  ngOnInit() { }

  cancel() {
    this.dialogRef.close('close');
  }

  printInvoice(){
    this.dialogRef.close('print');
  }

}
