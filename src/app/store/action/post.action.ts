 import {createAction, props} from '@ngrx/store'
 import {Post} from '../model/post.model'
 import { sample } from '../model/storeSampleData.model' 


//Post
 export const loadPost = createAction('[Post]  Load post')
 export const loadPostSuccess = createAction('[Post] Load Post Success',props<{posts:Post[]}>() )
 export const loadPostFailure = createAction('[Post] Load Post Failure', props<{error:string}>())
 export const addPost = createAction('[Post] AddPost', props<{post:Post}>())
 export const likepost = createAction('[Post] User Liked Post',props<{userid:string,postid:string}>())
 export const unlikepost = createAction('[Post] User Unliked Post',props<{userid:string,postid:string}>())

 //user
 export const loadUser = createAction('[User] load User')
 export const setUserID = createAction('[User] Set User ID',props<{id:string | null}>() )
 export const loadUserSuccess = createAction('[User] load User Success', props<
    {username:string,
    userProfileImgString:string,
    userCoverImgString:string,
    loginStatus:boolean,
   userEmail:string}>())
 export const loadUserFailure = createAction('[User] load User Faliure', props<{error:string}>()
)

//sample
export const loadSampleStore = createAction('[Samples] Load Samples')
export const loadSampleStoreSuccess = createAction('[Samples] Load Sample Success',props<{getSample:sample[]}>())
export const loadSampleStoreFail = createAction('[Samples] Load Sample Fail',props<{error:string}>())

 