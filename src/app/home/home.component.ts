import {ChangeDetectionStrategy, Component, inject, model, signal, OnInit} from '@angular/core';
import {MainService} from '../main.service'
import {HomeDialogComponent} from '../home/home-dialog/home-dialog.component'
import {  MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PostCommentsBottomSheetComponent } from './post-comments-bottom-sheet/post-comments-bottom-sheet.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
 
})
export class HomeComponent implements OnInit {
  readonly dialog = inject(MatDialog)
  
  constructor(
    private apiService : MainService, 
    public ModelDialog : MatDialog, 
    private bottom_sheet: MatBottomSheet  ){}
  public login_status:boolean = false
  public comments_visibility:boolean = false
  public comments_section:boolean = false
  public comments_:any;
  public Like:boolean=false
  public like_icon:string;
  public likecounts:number=0;
  comments = new FormControl('')
ngOnInit(): void {

  this.login_status = this.apiService.loggedIn
  this.like_icon="favorite_border"
}
openDialog() : void{
const dialogRef = this.ModelDialog.open(HomeDialogComponent)
}

comment(){

  // this.comments_section=!this.comments_section

}
open_comments(){
this.bottom_sheet.open(PostCommentsBottomSheetComponent)
this.comments_visibility = !this.comments_visibility
console.log(this.comments_visibility)
}
like_clicked(){

if(!this.Like){
  this.like_icon="favorite_border"
  this.likecounts--;
}else{
  this.like_icon="favorite"
  this.likecounts++;
}
const likesData = {
  _id:"",
  likes_counts:this.likecounts
}
this.apiService.likesCount('/home/likeCounts',this.likecounts).subscribe((response)=>{
  if(response.status){
    console.log("Likes Updated")
  }
})
}



}



 

