import { AfterViewInit } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/product/product.service';
import { MvSales } from '../sales.model';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.scss']
})
export class SalesFormComponent implements OnInit, AfterViewInit{

  products = [];
  action: string;
  selectedSales: MvSales = <MvSales>{};
  salesForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<SalesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public productService: ProductService) {
    dialogRef.disableClose = true;
    this.action = data.action;
    this.selectedSales = data.data || {}
  }

  ngOnInit() {
    this.salesForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: ['', Validators.required]
    });
    this.getProduct();
  }

  cancelClick() {
    this.dialogRef.close();
  }

  submitForm() {
    this.dialogRef.close(this.selectedSales)
  }

  ngAfterViewInit() {
    this.salesForm.updateValueAndValidity();
  }

  getProduct() {
    this.productService.getAllProduct().subscribe(data => {
      if (data) {
        data.forEach(element => {
          this.products.push({
            value: element.productId,
            selectValue: element.name
          });
        });
      }
    })
  }

}
