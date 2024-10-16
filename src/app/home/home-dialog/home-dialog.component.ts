import { Component, inject,viewChild } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { MainService } from '../../main.service';
import {selectPost,selectError,selectLoading} from '../../store/selectors/post.selector'
import {post} from '../../store/model/post.model'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home-dialog',
  templateUrl: './home-dialog.component.html',
  styleUrl: './home-dialog.component.css',
})
export class HomeDialogComponent {
  
  
  post$:Observable<post[]>
  constructor(private service: MainService,   private store:Store) {}
  public isLoading: boolean = false 
  readonly dialogRef = inject(MatDialogRef<HomeDialogComponent>);
  public file: File;
  public img_url : any;
  public imagePreview: string | ArrayBuffer| null = '';  

    onselectFile(event: any) {
    
    const file = event.target.files[0];
    console.log("triggered",file)
    const selectFileReader = new FileReader();
    
      selectFileReader.onload = (e:any)=>{
       
       console.log("file loaded", e.target.result)
        const selectedImg = new Image()
        selectedImg.src = e.target.result;
        selectedImg.onload= ()=>{
          console.log('Image loaded:', selectedImg);
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

            ctx.drawImage(selectedImg,0,0,width,height)
            this.imagePreview = canvas.toDataURL('image/jpeg', 0.5)
            console.log('low Quality image', this.imagePreview);
         
           
        }
       
      }

      selectFileReader.readAsDataURL(file)
 
  }
triggerFileInput(fileInput:HTMLInputElement){
fileInput.click()
}
  onNoClick(): void {

   
    const formData = new FormData();
    const fileReader = new FileReader()
    formData.append('image',this.file);
    console.log(this.file)
      // this.isLoading=true
    // this.service.uploadFIle(formData, '/user/upload').subscribe((response) => {
    //   if (response.status) {
    //     this.isLoading=false
    //     this.img_url = response.file;
    //     this.imagePreview = response.file.secure_url;
    //     console.log('uploaded successfully', response.file);
    //     // this.dialogRef.close();
    //   }
    // });
  }

  closeDialogBox(){
    this.dialogRef.close();
  }}
