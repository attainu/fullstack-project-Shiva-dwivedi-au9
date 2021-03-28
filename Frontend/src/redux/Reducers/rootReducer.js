
import { combineReducers } from 'redux'
import AuthReducer from './AuthReducers'
import authErrorReducer from './AuthErrorReducer'
import { UserProfileReducer } from './UserProfileReducer'
import AuthActionType from '../Actions/Auth/Action_type'
import { AddUserReducer } from './AddUserReducer'

const combineReducer =  combineReducers({

    auth : AuthReducer,
    authError : authErrorReducer,
    userProfile: UserProfileReducer,
    addUser: AddUserReducer

})

const rootReducer = (state , action ) => {
    if( action.type === AuthActionType.LOGOUT_SUCCESS ){
        state = undefined
    }
    return combineReducer(state,action)
}

export default rootReducer