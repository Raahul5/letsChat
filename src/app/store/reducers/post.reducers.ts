import {createReducer, on} from '@ngrx/store'
import {Post} from '../model/post.model'
import {loadPost,loadPostFailure,loadPostSuccess, addPost} from '../action/post.action'


export interface PostState{
    posts:Post[],
    loading:boolean,
    error:string|null
}

export const initialState:PostState = {
    posts:[],
    loading:false,
    error:null
}

export const postReducer = createReducer(
    initialState,
    on(loadPost, (state)=>({...state,loading:true,  error: null})),
    on(loadPostSuccess,(state,{posts})=>({...state,loading:false,posts})),
    on(loadPostFailure,(state,{error})=>({...state,loading:false,error})),
    on(addPost,(state,{post})=>({...state,posts:[...state.posts,post]}))
)