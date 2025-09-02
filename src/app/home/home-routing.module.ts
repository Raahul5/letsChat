import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '../home/home.component'
import { PostCommentsBottomSheetComponent } from './post-comments-bottom-sheet/post-comments-bottom-sheet.component';
import { HomeDialogComponent } from './home-dialog/home-dialog.component';
import { SampleComponent } from './sample/sample.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  {path:'', component:HomeComponent,
    children:[
      {path:'sample', component:SampleComponent } 
    ],canActivate:[authGuard],
        data:{role:'USER'}
   },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
