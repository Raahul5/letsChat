import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MainService } from '../../main.service'
import { loadPost, loadPostFailure, loadPostSuccess } from '../action/post.action'
import {mergeMap,map,catchError, withLatestFrom} from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import * as User from '../action/post.action'
import { Store } from '@ngrx/store';
import {selectUserDetails} from '../selectors/post.selector'
@Injectable()
export class PostEffects{
    userID:Observable<string|null>
    constructor(
        private readonly acions$:Actions, 
        private readonly postService:MainService,
        private readonly store:Store){
            this.userID = this.store.select(selectUserDetails)
        }
    

    loadPost$ = createEffect(()=>
        this.acions$.pipe(
            ofType(loadPost),
            mergeMap(()=>
                this.postService.fetchAllPost('/home/allpost').pipe(
                    map(res => loadPostSuccess({posts: res.data })),
                    catchError(error=>of(loadPostFailure({error:error.message})))
                )
            )
        )
    )

    loadSample$ = createEffect(()=>
    this.acions$.pipe(
      ofType(User.loadSampleStore),
      mergeMap(()=>
      this.postService.getSomeData('https://api.restful-api.dev/objects').pipe(
       map(res => User.loadSampleStoreSuccess({
        getSample:res.map((data:any) => ({ id:data.id, name:data.name }))
      })),
      catchError(error=>of(User.loadSampleStoreFail({error:error.message})))
      ))
    ))

    loadUser$ = createEffect(() =>
        this.acions$.pipe(
          ofType(User.setUserID),  
          withLatestFrom(this.store.select(selectUserDetails)),  
          mergeMap(([action]) => 
            this.postService.getUserDetails('/user/user-details', action.id).pipe( 
              map(res =>
                 User.loadUserSuccess({  
                username: res.data.firstname,
                userProfileImgString:res.data.profileImgString,
                userCoverImgString:res.data.coverImgString,
                loginStatus: true,
                userEmail: res.data.email
              })),
              catchError(error => of(User.loadUserFailure({ error: error.message })))  
            )
          )
        )
      );




    
}