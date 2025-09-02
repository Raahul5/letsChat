import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  Inject,
  ChangeDetectorRef
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { CoverPicDialogBoxComponent } from './cover-pic-dialog-box/cover-pic-dialog-box.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as userstateselect from '../store/selectors/post.selector'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {
  @ViewChild('imageElement', { static: false }) imageElement!: ElementRef;

  dialog = Inject(MatDialog);
  croppedImageUrl: Observable<string>;
  profileImageUrl: Observable<string>;
  imageChangedEvent: string | null = null;
  cropper!: Cropper;
  showCropper = false;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly cdr: ChangeDetectorRef,
    private readonly store: Store) 
    {
    this.croppedImageUrl = this.store.select(userstateselect.selectUserCoverImgString)
    this.profileImageUrl = this.store.select(userstateselect.selectUserProfileImgString)
  }

  openModel() {
    const coverDialogRef = this.matDialog.open(CoverPicDialogBoxComponent, {
      width: '700px', disableClose: true, closeOnNavigation: false,
      data: {
        aspectRatio: 3 / 1,
        cropWidth: 1200,
        cropHeight: 400,
        coverWords: "Cover Photo"
      }
    })
    coverDialogRef.afterClosed().subscribe(result => {
      this.croppedImageUrl = result;
      this.cdr.markForCheck();
    });
  }

  openProfileModel() {
    const coverDialogRef = this.matDialog.open(CoverPicDialogBoxComponent, {
      width: '700px', disableClose: true, closeOnNavigation: false,
      data: {
        aspectRatio: 1,
        cropWidth: 300,
        cropHeight: 300,
        coverWords: "Profile photo"
      }
    })
    coverDialogRef.afterClosed().subscribe(result => {
      this.profileImageUrl = result;
      this.cdr.markForCheck();
    });
  }

}



