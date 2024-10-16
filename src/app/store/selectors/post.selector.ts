import {createFeatureSelector,createSelector} from '@ngrx/store'
import {postState} from '../reducers/post.reducers'
import {userState} from '../reducers/user.reducer'


export const selectPostState = createFeatureSelector<postState>('postStore')
export const SelectUserState = createFeatureSelector<userState>('userStore')

export const selectPost = createSelector(selectPostState,(state: postState )=>state.posts)
export const selectError = createSelector(selectPostState,(state)=>state.error)
export const selectLoading = createSelector(selectPostState,(state)=>state.loading)

export const selectUserDetails = createSelector(SelectUserState,(state)=>state.id)