import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../main.service';
import { Post } from '../../store/model/post.model'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {addPost} from '../../store/action/post.action'
@Component({
  selector: 'app-home-dialog',
  templateUrl: './home-dialog.component.html',
  styleUrl: './home-dialog.component.css',
})
export class HomeDialogComponent {


  post$: Observable<Post[]>
  constructor(private readonly service: MainService,     private readonly store: Store) { }
  public isLoading: boolean = false
  readonly dialogRef = inject(MatDialogRef<HomeDialogComponent>);
  public uploadfile: File;
  public img_url: any;
  public imagePreview: string | ArrayBuffer | null = '';
  public postdescription:string="";
  onselectFile(event: any) {
    this.uploadfile = event.target.files[0];
    const file = event.target.files[0];

    const selectFileReader = new FileReader();

    selectFileReader.onload = (e: any) => {


      const selectedImg = new Image()
      selectedImg.src = e.target.result;
      selectedImg.onload = () => {

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!;

        const MAXWIDTH = 100;
        const MAXHEIGHT = 100;

        let width = selectedImg.width;
        let height = selectedImg.height;

        if (width > height) {
          if (width > MAXWIDTH) {
            height *= MAXWIDTH / width;
            width = MAXWIDTH;
          }
        } else {
          if (height > MAXHEIGHT) {
            width *= MAXHEIGHT / height;
            height = MAXHEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(selectedImg, 0, 0, width, height)
        this.imagePreview = canvas.toDataURL('image/jpeg', 0.5)
        console.log('low Quality image', this.imagePreview);


      }

    }

    selectFileReader.readAsDataURL(file)

  }
  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click()
  }
  onNoClick(): void {

    const formData = new FormData();
    formData.append('file', this.uploadfile);
    formData.append('userid', "EMP002");
    formData.append('postdescription', this.postdescription);
  
    this.isLoading = true
 console.log(this.postdescription)
    this.service.uploadFIle(formData, '/api/upload').subscribe((response) => {
      console.log(response)
      if (response.status) {
        this.isLoading = false
        this.img_url = response.data.postimgurl;
        this.store.dispatch(addPost({post:response.data}))
        console.log('uploaded successfully', response.data.postimgurl);
        this.dialogRef.close();
      }
    });
  }

  closeDialogBox() {
    this.dialogRef.close();
  }
}
