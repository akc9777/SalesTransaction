import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvoiceService } from 'src/app/invoice/invoice.service';
import { UserDetailService } from 'src/app/user-detail/user-detail.service';
import { MvSales } from '../sales.model';
@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit, AfterViewInit {

  customers = [];
  sales = [];
  invoiceForm: FormGroup;
  customerId: number;
  payload= [];


  constructor(public dialogRef: MatDialogRef<CreateInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public invoiceService: InvoiceService,
    public customerService: UserDetailService) { 
      for(let item of this.data.data.selected) {
        console.log(item.salesId);
        this.sales.push({salesId: item.salesId })
        console.log(this.sales)
      }
    }

  ngOnInit() {
    this.invoiceForm = this.fb.group({
      customerId: ['', Validators.required]
    });
    this.getCustomer();
  }
  ngAfterViewInit() {
    this.invoiceForm.updateValueAndValidity();
  }

  getCustomer() {
    this.customerService.getAllUserDetail().subscribe(data => {
      if (data) {
        data.forEach(element => {
          this.customers.push({
            value: element.customerId,
            selectValue: element.firstName + " " + element.lastName
          });
        });
      }
    });
  }

  submitForm() {
    this.payload.push({
      customerId: this.customerId,
      sales: JSON.stringify(this.sales)
    });
    this.dialogRef.close(this.payload);
  }

  close() {
    this.payload = []
    this.sales= []
    this.dialogRef.close('close');
  }

}
