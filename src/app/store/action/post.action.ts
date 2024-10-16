 import {createAction, props} from '@ngrx/store'
 import {post} from '../model/post.model'


//Post
 export const loadPost = createAction('[Post]  Load post')
 export const loadPostSuccess = createAction('[Post] Load Post Success',props<{posts:post[]}>() )
 export const loadPostFailure = createAction('[Post] Load Post Failure', props<{error:string}>())
 export const addPost = createAction('[Post] AddPost', props<{post:post}>())

 //user
 export const loadUser = createAction('[User] load User')
 export const setUserID = createAction('[User] Set User ID',props<{id:string}>() )
 export const loadUserSuccess = createAction('[User] load User Success', props<
    {userName:string,
    token:string,
    loginStatus:boolean}>())
 export const loadUserFailure = createAction('[User] load User Faliure', props<{error:string}>())
 