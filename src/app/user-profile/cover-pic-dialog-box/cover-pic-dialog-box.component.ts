import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-cover-pic-dialog-box',
  templateUrl: './cover-pic-dialog-box.component.html',
  styleUrl: './cover-pic-dialog-box.component.css'
})
export class CoverPicDialogBoxComponent {
  aspectRatio:any;
  coverWidth:any;
  coverHeight:any;
  coverWords:string;
  constructor(
    private readonly matDialog: MatDialog,
    private readonly apiService: MainService,
    private readonly coverDialogRef: MatDialogRef<CoverPicDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.aspectRatio = data.aspectRatio
    this.coverWidth = data.cropWidth
    this.coverHeight = data.cropHeight
    this.coverWords = data.coverWords
  }

  @ViewChild('imageElement', { static: false }) imageElement!: ElementRef;

  croppedImageUrl: string | null = null;
  imageChangedEvent: string | null = null;
  cropper!: Cropper;
  showCropper = false;
  private isAlive = true;


  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageChangedEvent = reader.result as string;
        this.showCropper = true;


        setTimeout(() => {
          this.cropper = new Cropper(this.imageElement.nativeElement, {
            aspectRatio: this.aspectRatio,
            viewMode: 1,
            autoCropArea: 1,
            movable: true,
            scalable: true,
            zoomable: true
          });
        });
      };
      reader.readAsDataURL(file);
    }
  }

  cropImage(): void {
    const canvas = this.cropper.getCroppedCanvas({
      width: this.coverWidth,
      height: this.coverHeight
    });

    canvas.toBlob((blob) => {
      if (blob) {
        this.croppedImageUrl = URL.createObjectURL(blob);
        this.uploadToServer(blob);
        this.imageChangedEvent = null;
        this.showCropper = false;
      }
    }, 'image/png');
  }

  cancelCrop(): void {
    this.showCropper = false;
    if (this.cropper) {
      this.cropper.destroy();
    }
  }

   uploadToServer(blob: Blob): void {

    const formData = new FormData();
    const userid: string | null  =  this.apiService.getUserId();
    formData.append(this.data.coverWords , blob, 'cover.png');
    formData.append('userid',userid ?? "");

    if(this.data.coverWords=="Profile photo"){
           this.apiService.uploadFIle(formData, "/api/profile-upload").subscribe((response) => {
   
      if (this.isAlive && response.status) {
        this.coverDialogRef.close(response.data.profileImgString)
        console.log(response)
      }
    })
    }else{
   this.apiService.uploadFIle(formData, "/api/cover-upload").subscribe((response) => {
   
      if (this.isAlive && response.status) {
        this.coverDialogRef.close(response.data.coverImgString)
        console.log(response)
      }
    })
    }
   
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}


