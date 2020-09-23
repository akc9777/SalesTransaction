import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

const routes: Routes = [
  {
    path: '',
    component: UserDetailComponent
  }
];

@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatButtonModule,
    MatTableModule
  ],
  exports: [UserDetailComponent]
})
export class UserDetailModule { }
