import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormControl } from '@angular/forms';
import  {MainService} from '../../main.service'
@Component({
  selector: 'app-post-comments-bottom-sheet',
  templateUrl: './post-comments-bottom-sheet.component.html',
  styleUrl: './post-comments-bottom-sheet.component.css',
})
export class PostCommentsBottomSheetComponent implements OnInit, OnDestroy{
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private readonly postService:MainService) {}
  ngOnInit(): void {
    this.postService.getSomeData('/home/allcomments').subscribe((response)=>{
      if(response.status){
        this.comments_array = response.comments
      }
    })
  }
  public comments_array: any[];
  comments = new FormControl('');

  addComment() {
    if(this.comments.value){
      this.comments_array.unshift({
        comment_userName: 'Raahul',
        comment_UserComment: this.comments.value,
      });
      this.comments.reset('');
    }
    
  }
ngOnDestroy(): void {
  this.postService.addComments("/home/addComments", this.comments_array).subscribe((response)=>{
    if(response.status){
      console.log("Comments Added")
    }
  })
}
  
}



