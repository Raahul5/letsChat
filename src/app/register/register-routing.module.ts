import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from '../register/register.component'
import {authGuard} from '../../app/auth.guard'
const routes: Routes = [
  {path:'', component:RegisterComponent, canActivate:[authGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
