import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeComponent } from './practice/practice.component';
import { InnerComponent } from './practice/inner/inner.component';

const routes: Routes = [
  {path:'login', loadChildren: ()=> import('../app/login/login.module').then(m => m.LoginModule)},
  {path:'register/:id', loadChildren: ()=> import('../app/register/register.module').then(m => m.RegisterModule)},
  {path:'', loadChildren: ()=> import('../app/home/home.module').then(m => m.HomeModule)},
  {path : 'practice', component:PracticeComponent},
  {path : 'practice/inner', component:InnerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
