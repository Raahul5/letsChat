import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {  MatDialogModule } from '@angular/material/dialog';
import { HomeDialogComponent } from './home-dialog/home-dialog.component';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { PostCommentsBottomSheetComponent } from './post-comments-bottom-sheet/post-comments-bottom-sheet.component';
@NgModule({
  declarations: [
    HomeComponent,
    HomeDialogComponent,
    PostCommentsBottomSheetComponent,
  
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatBottomSheetModule
  ]
})
export class HomeModule { }
