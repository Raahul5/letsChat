import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeComponent } from './practice/practice.component';
import { InnerComponent } from './practice/inner/inner.component';
import {authGuard} from '../app/auth.guard'

const routes: Routes = [
  { path:'login', loadChildren: ()=> import('../app/login/login.module').then(m => m.LoginModule)},
  {path:'register', 
    loadChildren: ()=> import('../app/register/register.module').then(m => m.RegisterModule)},
  {path:'', loadChildren: ()=> import('../app/home/home.module').then(m => m.HomeModule), canActivate:[authGuard],
    data:{role:'USER'}},
  {
    path:'settings', 
    loadChildren:()=>import('../app/menu/settings/profile/profile.module').then(module => module.ProfileModule),
    canActivate:[authGuard],
    data:{role:'USER'}
  },

  {path : 'practice', component:PracticeComponent},
  {path : 'practice/inner', component:InnerComponent},
  { path: 'user-profile', 
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule),
canActivate:[authGuard],
  data:{role:'USER'}
   },
  { path: 'cover-pic-dialog-box', loadChildren: () => import('./user-profile/cover-pic-dialog-box/cover-pic-dialog-box.module').then(m => m.CoverPicDialogBoxModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
