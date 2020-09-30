import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { InvoiceService } from './invoice.service';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [{ path: '', component: InvoiceComponent }]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    CdkTableModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  entryComponents: [InvoiceDetailComponent],
  declarations: [InvoiceComponent, InvoiceDetailComponent],
  providers: [InvoiceService, SnackbarService],
  exports: [InvoiceComponent]
})
export class InvoiceModule { }
