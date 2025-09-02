import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MainService } from '../main.service'
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PostCommentsBottomSheetComponent } from './post-comments-bottom-sheet/post-comments-bottom-sheet.component';
import { loadPost} from '../store/action/post.action'
import * as selector  from '../store/selectors/post.selector'
import { Post } from '../store/model/post.model'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HomeDialogComponent } from './home-dialog/home-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HomeComponent implements OnInit {
 

  constructor(
    private readonly apiService: MainService,
    public ModelDialog: MatDialog,
    private readonly bottom_sheet: MatBottomSheet,
    private readonly store: Store
  ) {
    this.post$ = this.store.select(selector.selectPost)
    this.loading$ = this.store.select(selector.selectLoading)
    this.error$ = this.store.select(selector.selectError)
    this.profileImgString= this.store.select(selector.selectUserProfileImgString)
  }


  readonly dialog = inject(MatDialog)
  public post$: Observable<Post[]>
  public loading$: Observable<boolean>
  public error$: Observable<string | null>
  public profileImgString:Observable<string>
  public login_status: boolean = false
  public comments_visibility: boolean = false
  public comments_section: boolean = false
  public comments_: any;
  public Like: boolean = false
  public like_icon: string;
  public likecounts: number = 0;
  comments = new FormControl('')
  selected = 'Select Option'


  ngOnInit(): void {

    this.store.dispatch(loadPost())
    this.login_status = this.apiService.loggedIn
    this.like_icon = "favorite_border"
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

    this.apiService.likesCount('/home/likeCounts', this.likecounts).subscribe((response) => {
      if (response.status) {
        console.log("Likes Updated")
      }
    })
  }

  openPostDialog() {

    this.ModelDialog.open(HomeDialogComponent, {
      width: '700px',
      data: { message: 'Open your post component' }
    })

  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.openPostDialog();
      event.preventDefault();
    }
  }

  onImgError(event:Event){
    const target = event.target as HTMLImageElement
      target.onerror = null;
      target.src = '../assets/display.jpg';
  }
  

}





