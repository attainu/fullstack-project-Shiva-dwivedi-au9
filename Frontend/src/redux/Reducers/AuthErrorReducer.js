import AddUserType from '../Actions/AddUser/AddUserType'
import AuthActionType from '../Actions/Auth/Action_type'

const AuthError = {
    message: ""
}

const authErrorReducer = ( state = AuthError  , action ) => {

    switch (action.type) {
        case AuthActionType.LOGIN_FAIL :
            return { message : action.payload }

        case AuthActionType.LOGOUT_FAIL:
            return { message : action.payload }

        case AddUserType.ADD_USER_FAIL:
            return { message :action.payload }

        default:
            return state
    }

}

export default authErrorReducer