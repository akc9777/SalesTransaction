import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvProduct } from '../product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, AfterViewInit {

  action: string;
  selectedProduct: MvProduct = <MvProduct>{};
  productForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder) {
    dialogRef.disableClose = true;
    this.action = data.action;
    this.selectedProduct = data.data || {};
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      rate: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      remainingQuantity: ['', [Validators.required, Validators.pattern('[0-9]*')]]
    });
  }

  cancelClick() {
    this.dialogRef.close();
  }

  submitForm() {
    this.dialogRef.close(this.selectedProduct)
  }

  ngAfterViewInit() {
    this.productForm.updateValueAndValidity();
  }

}
