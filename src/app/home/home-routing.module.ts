import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '../home/home.component'
import { PostCommentsBottomSheetComponent } from './post-comments-bottom-sheet/post-comments-bottom-sheet.component';

const routes: Routes = [
  {path:'', component:HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
