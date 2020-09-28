import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { ProductFormComponent } from './product-form/product-form.component';
import { MvProduct } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvProduct>;
  errorMessages = '';
  selectedProduct: MvProduct = <MvProduct>{};
  selection = new SelectionModel<MvProduct>(false, []);

  constructor(private productService: ProductService,
    private snackBar: SnackbarService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.displayedColumns = ['productId', 'name', 'description', 'rate', 'remainingQuantity']
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe(
      (data: any) => {
        if (data) {
          this.dataSource = new MatTableDataSource<MvProduct>(data);
        } else {
          this.dataSource = new MatTableDataSource<MvProduct>();
          this.errorMessages = 'No relevant data present in system';
        }
      }
    );
  }

  rowClick(e: any, row: MvProduct) {
    this.selectedProduct = { ...row }
    this.selection.toggle(row);
  }

  addProduct() {
    this.selection.clear();
    this.selectedProduct = <MvProduct>{};
    this.openDialog('add');
  }

  editProduct() {
    this.openDialog('edit');
  }

  openDialog(action: string) {
    if (action === 'edit' && !this.selection.hasValue()) {
      this.snackBar.openSnackBar('No product selected', 'warning');
      return;
    }

    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '300px',
      data: { data: this.selectedProduct, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedProduct = result;

        if (action === 'edit') {
          this.productService.editProduct(result).subscribe(result => {
            this.snackBar.openSnackBar('Product Updated', 'success');
            this.getAllProduct();
          });
        } else {
          this.productService.addProduct(result).subscribe(result => {
            this.snackBar.openSnackBar('Product Added', 'success')
            this.getAllProduct();
          })
        }
      }
    });
  }

}
