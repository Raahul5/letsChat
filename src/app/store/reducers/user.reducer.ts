import {createReducer, on} from '@ngrx/store'
import * as userAction from '../action/post.action'

export interface userState{
    id:string,
    userName:string,
    loginStatus:boolean,
    token:string,
    loading:boolean,
    error:string|null
} 

export const initialState:userState = {
    id:'',
    userName:'',
    loginStatus:false,
    token:'',
    loading:false,
    error:null
}


export const userReducer = createReducer(
    initialState,
    on(userAction.loadUser, (state)=>({...state,loading:true,error:null})),
    on(userAction.setUserID,(state,{id})=>({...state,id})),
    on(userAction.loadUserFailure,(state,{error})=>({...state, loading:false, error})),
    on(userAction.loadUserSuccess,(state, {userName,token,loginStatus} )=>(
        {...state,
            userName, 
            token, 
            loginStatus}
    ))
)