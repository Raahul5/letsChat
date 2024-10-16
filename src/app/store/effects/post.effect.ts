import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MainService } from '../../main.service'
import { loadPost, loadPostFailure, loadPostSuccess } from '../action/post.action'
import {mergeMap,map,catchError,tap, withLatestFrom} from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import * as User from '../action/post.action'
import { Store } from '@ngrx/store';
import {selectUserDetails} from '../selectors/post.selector'
import { Action } from 'rxjs/internal/scheduler/Action'
@Injectable()
export class PostEffects{
    userID:Observable<string|null>
    constructor(
        private acions$:Actions, 
        private postService:MainService,
        private store:Store){
            this.userID = this.store.select(selectUserDetails)
        }
    

    loadPost$ = createEffect(()=>
        this.acions$.pipe(
            ofType(loadPost),
            mergeMap(()=>
                this.postService.sampleGetData('/post/samplepost').pipe(
                    map(res => loadPostSuccess({posts: res.data })),
                    catchError(error=>of(loadPostFailure({error:error.message})))
                )
            )
        )
    )

    // loadUser$ = createEffect( ()=>
    // this.acions$.pipe(
    //     ofType(User.setUserID),
    //     withLatestFrom(this.store.select(selectUserDetails)),
    //     mergeMap((([Action ,id]))=>
    //     this.postService.getUserDetails('/user/userDetails', id  ).pipe(
    //         tap(res => console.log(JSON.stringify(res) + " From Effects")),
    //         map(res => User.loadUserSuccess(
    //             {userName:res.email, 
    //             id:res._id, 
    //             token:'',
    //             loginStatus:true
    //         })),
    //             catchError(error=> of(User.loadUserFailure({error:error.message})))
    //     ))
    // ))
    loadUser$ = createEffect(() =>
        this.acions$.pipe(
          ofType(User.setUserID),  
          withLatestFrom(this.store.select(selectUserDetails)),  
          mergeMap(([id]) => 
            this.postService.getUserDetails('/user/userDetails', id).pipe( 
              tap(res => console.log(JSON.stringify(res.result.email) + " From Effects")), 
              map(res =>
                 User.loadUserSuccess({  
                userName: res.result.email,
                token: '', 
                loginStatus: true 
              })),
              catchError(error => of(User.loadUserFailure({ error: error.message })))  
            )
          )
        )
      );




    
}