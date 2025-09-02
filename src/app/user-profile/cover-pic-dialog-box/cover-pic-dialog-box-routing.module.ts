import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoverPicDialogBoxComponent } from './cover-pic-dialog-box.component';

const routes: Routes = [{ path: '', component: CoverPicDialogBoxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoverPicDialogBoxRoutingModule { }
