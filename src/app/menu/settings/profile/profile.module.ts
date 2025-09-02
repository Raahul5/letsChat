import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProfileRoutingModule } from './profile-routing.module';
import { RouterModule } from '@angular/router';
import {
  ReactiveFormsModule,

} from '@angular/forms';
import { ProfileComponent } from './profile.component';
import {EvenNumbersPipe} from '../../../pipes/even-numbers.pipe'
@NgModule({
  declarations: [ProfileComponent, EvenNumbersPipe],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule,

  ]
})
export class ProfileModule { }
