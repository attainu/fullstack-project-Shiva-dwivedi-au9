import axios from "axios";
import AuthActionType from '../Actions/Auth/Action_type'

const AuthState =  {
    isLoggedIn : false,
    user:{
        auth:"",
        jwttoken:""
    }
}
const getAuthState = () => {
   
    try {
        const authenticate = localStorage.getItem("auth")
        const authObj = JSON.parse(authenticate)
        const {auth,jwttoken } = authObj.user
        if (auth){
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwttoken}`
            return authObj
        }
        return AuthState
    } catch (error) {
        return AuthState
    }
}

const newAuth = getAuthState()

const AuthReducer = ( state = newAuth, action ) => {

    switch (action.type) {
        
        case AuthActionType.LOGIN_SUCCESS:
            const newAuthState = {
                isLoggedIn:true,
                user:action.payload
            }
            axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload.jwttoken}`
            localStorage.setItem("auth", JSON.stringify(newAuthState))
            return newAuthState

        case AuthActionType.LOGOUT_SUCCESS:
            localStorage.removeItem("auth")
            return AuthState

        case AuthActionType.LOGOUT_FAIL:
            localStorage.removeItem("auth")
            return AuthState

        case AuthActionType.LOGIN_FAIL:
        return state
    
        default:
            return state
    }
        return state

}


export default AuthReducer