import {createFeatureSelector,createSelector} from '@ngrx/store'
import {PostState} from '../reducers/post.reducers'
import {UserState} from '../reducers/user.reducer'
import { sampleState } from '../reducers/sample.reducers'

export const selectPostState = createFeatureSelector<PostState>('postStore')
export const SelectUserState = createFeatureSelector<UserState>('userStore')
export const SelectSampleState = createFeatureSelector<sampleState>('sampleStore')

export const selectPost = createSelector(selectPostState,(state: PostState )=>state.posts)
export const selectError = createSelector(selectPostState,(state)=>state.error)
export const selectLoading = createSelector(selectPostState,(state)=>state.loading)

export const selectUserDetails = createSelector(SelectUserState,(state)=>state.id)
export const SelectUserName = createSelector(SelectUserState, (state) => state.username) 
export const selectUserProfileImgString = createSelector(SelectUserState,(state)=> state.userProfileImgString)
export const selectUserCoverImgString = createSelector(SelectUserState,(state)=> state.userCoverImgString)
export const selectSampleData = createSelector(SelectSampleState,(state:sampleState)=>state.getSample)