import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InnerComponent } from './inner/inner.component';




const routes: Routes = [
  {path:'/inner', component: InnerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeModule { }
