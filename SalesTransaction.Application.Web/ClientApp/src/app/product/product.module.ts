import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { Routes, RouterModule } from '@angular/router';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from './product.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CdkTableModule } from '@angular/cdk/table';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [{ path: '', component: ProductComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,

    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CdkTableModule
  ],
  entryComponents: [ProductFormComponent],
  declarations: [ProductComponent, ProductFormComponent],
  exports: [ProductComponent],

  providers: [ProductService, SnackbarService]
})
export class ProductModule { }
