import {createReducer, on} from '@ngrx/store'
import * as userAction from '../action/post.action'
import { sample } from '../model/storeSampleData.model' 

export interface sampleState{
 getSample:sample[],
 loading:boolean,
 error:string|null
}

export const initialState:sampleState ={
getSample : [],
loading:false,
error:null
}


export const samplereducer = createReducer(
    initialState,
    on(userAction.loadSampleStore,(state)=>({...state,loading:true,error:null})),
    on(userAction.loadSampleStoreSuccess,(state,{getSample})=>({...state,getSample,loading:true,error:null})),
    on(userAction.loadSampleStoreFail,(state,{error})=>({...state,error}))
)