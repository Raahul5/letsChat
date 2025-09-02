import {createReducer, on} from '@ngrx/store'
import * as userAction from '../action/post.action'

export interface UserState{
    id:string|null,
    username:string,
    userEmail:string,
    userProfileImgString:string,
    userCoverImgString:string,
    loginStatus:boolean,
    loading:boolean,
    error:string|null
} 

export const initialState:UserState = {
    id:'',
    username:'',
    userEmail:'',
    userProfileImgString:'',
    userCoverImgString:'',
    loginStatus:false,
    loading:false,
    error:null
}


export const userReducer = createReducer(
    initialState,
    on(userAction.loadUser, (state)=>({...state,loading:true,error:null})),
    on(userAction.setUserID,(state,{id})=>({...state,id})),
    on(userAction.loadUserFailure,(state,{error})=>({...state, loading:false, error})),
    on(userAction.loadUserSuccess,(state, {username,userProfileImgString,userCoverImgString,loginStatus,userEmail} )=>(
        {...state,
            username, 
            userProfileImgString,
            userCoverImgString,
            loginStatus,
            userEmail}
    ))
)