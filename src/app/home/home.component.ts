import { ChangeDetectionStrategy, Component, inject, model, signal, OnInit } from '@angular/core';
import { MainService } from '../main.service'
import { HomeDialogComponent } from '../home/home-dialog/home-dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PostCommentsBottomSheetComponent } from './post-comments-bottom-sheet/post-comments-bottom-sheet.component';
import {loadPost} from '../store/action/post.action'
import {selectPost,selectError,selectLoading} from '../store/selectors/post.selector'
import {post} from '../store/model/post.model'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HomeComponent implements OnInit {
  readonly dialog = inject(MatDialog)
  post$:Observable<post[]>
  loading$:Observable<boolean>
  error$:Observable<string|null>


  constructor(
    private apiService: MainService,
    public ModelDialog: MatDialog,
    private bottom_sheet: MatBottomSheet,
    private store:Store
  ) {
   this.post$=this.store.select(selectPost)
   this.loading$=this.store.select(selectLoading)
   this.error$=this.store.select(selectError)
  }




  public login_status: boolean = false
  public comments_visibility: boolean = false
  public comments_section: boolean = false
  public comments_: any;
  public Like: boolean = false
  public like_icon: string;
  public likecounts: number = 0;
  comments = new FormControl('')



  ngOnInit(): void {
    this.store.dispatch(loadPost())
    // this.post$.subscribe(posts => {
    //   console.log("Selector post", posts);
    // });
    this.login_status = this.apiService.loggedIn
    this.like_icon = "favorite_border"
  }


  openDialog(): void {
    const dialogRef = this.ModelDialog.open(HomeDialogComponent,{disableClose:true})
  }

  comment() {

    // this.comments_section=!this.comments_section

  }
  open_comments() {
    this.bottom_sheet.open(PostCommentsBottomSheetComponent)
    this.comments_visibility = !this.comments_visibility
    console.log(this.comments_visibility)
  }
  like_clicked() {

    if (!this.Like) {
      this.like_icon = "favorite_border"
      this.likecounts--;
    } else {
      this.like_icon = "favorite"
      this.likecounts++;
    }
    const likesData = {
      _id: "",
      likes_counts: this.likecounts
    }
    this.apiService.likesCount('/home/likeCounts', this.likecounts).subscribe((response) => {
      if (response.status) {
        console.log("Likes Updated")
      }
    })
  }



}





