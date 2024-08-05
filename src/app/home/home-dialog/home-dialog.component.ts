import { Component, inject } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-home-dialog',
  templateUrl: './home-dialog.component.html',
  styleUrl: './home-dialog.component.css',
})
export class HomeDialogComponent {
  constructor(private service: MainService) {}
  public isLoading: boolean = false 
  readonly dialogRef = inject(MatDialogRef<HomeDialogComponent>);
  public file: File;
  public img_url : any;
  onselectFile(event: any) {
    this.file = event.target.files[0];
  }

  onNoClick(): void {
    const formData = new FormData();
    formData.append('image',this.file);
      this.isLoading=true
    this.service.uploadFIle(formData, '/user/upload').subscribe((response) => {
      if (response.status) {
        this.isLoading=false
        this.img_url = response.file;
        console.log('uploaded successfully', response.file);
        this.dialogRef.close();
      }
    });
  }
}
