import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoverPicDialogBoxRoutingModule } from './cover-pic-dialog-box-routing.module';
import { CoverPicDialogBoxComponent } from './cover-pic-dialog-box.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CoverPicDialogBoxComponent
  ],
  imports: [
    CommonModule,
    CoverPicDialogBoxRoutingModule,
    MatIconModule
  ]
})
export class CoverPicDialogBoxModule { }
