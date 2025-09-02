import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { MatIconModule } from '@angular/material/icon';





@NgModule({
  declarations: [
    UserProfileComponent
   
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ImageCropperComponent,
    MatIconModule
    

  ]
})
export class UserProfileModule { }
